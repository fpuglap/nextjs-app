import { SanityDocument } from '@sanity/client';
import Post from '@/app/_components/post';
import { postQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/sanity.fetch';

export default async function Page({ params }: { params: any }) {
  const post = await sanityFetch<SanityDocument>({ query: postQuery, params });

  console.log(post);

  return <Post post={post} />;
}
