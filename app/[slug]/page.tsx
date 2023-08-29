import { SanityDocument } from '@sanity/client';
import { draftMode } from 'next/headers';
import Post from '@/app/_components/post';
import { postPathsQuery, postQuery } from '@/sanity/lib/queries';
import { sanityFetch, token } from '@/sanity/lib/sanity.fetch';
import { client } from '@/sanity/lib/client';
import PreviewProvider from '@/app/_components/preview.provider';
import PreviewPost from '@/app/_components/preview.post';

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  // Important, use the plain Sanity Client here
  const posts = await client.fetch(postPathsQuery);

  return posts;
}

export default async function Page({ params }: { params: any }) {
  const post = await sanityFetch<SanityDocument>({ query: postQuery, params });
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPost post={post} />
      </PreviewProvider>
    );
  }

  return <Post post={post} />;
}
