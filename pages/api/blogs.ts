// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readdir } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

type Data = {
  status: string;
  data: { posts: string[] };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    /// fetch all blog post files
    const path = join(process.cwd(), 'blogPosts');
    const allPost = await readdir(path, 'utf-8');

    res.status(200).json({
      status: 'success',
      data: {
        posts: allPost,
      },
    });
  }
}
