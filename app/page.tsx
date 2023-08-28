import { SanityDocument } from 'next-sanity';
import Posts from '@/app/_components/posts';
import { postsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/sanity.fetch';

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });

  console.log(posts);

  return <Posts posts={posts} />;
}
