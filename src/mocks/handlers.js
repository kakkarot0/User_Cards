import { rest } from 'msw';

export const handlers = [
  rest.get('https://reqres.in/api/users?page=1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            avatar: 'https://example.com/avatar.jpg',
          },
          {
            id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
            avatar: 'https://example.com/avatar2.jpg',
          },
        ],
      })
    );
  }),
];
