import { SanityDocument } from 'next-sanity';
import Posts from '@/app/_components/posts';
import { postsQuery } from '@/sanity/lib/queries';
import { sanityFetch, token } from '@/sanity/lib/sanity.fetch';
import { draftMode } from 'next/headers';
import PreviewPosts from '@/app/_components/preview.posts';
import PreviewProvider from '@/app/_components/preview.provider';

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;

  console.log(posts);

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <div>I&apos;m in preview mode.</div>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }

  return <Posts posts={posts} />;
}
