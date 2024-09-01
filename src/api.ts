import { db } from './drizzle';

import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { todo } from './todos.sql';

export const handler: APIGatewayProxyHandlerV2 = async (evt) => {
  if (evt.requestContext.http.method === 'GET') {
    const result = await db.select().from(todo).execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  }

  if (evt.requestContext.http.method === 'POST') {
    const result = await db
      .insert(todo)
      .values({ title: 'Todo', description: crypto.randomUUID() })
      .returning()
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
};
