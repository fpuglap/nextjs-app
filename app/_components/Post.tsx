'use client';

import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { SanityDocument } from '@sanity/client';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import urlFor from '@/sanity/lib/url.for';

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <main className='container mx-auto prose prose-lg p-4'>
      <h1>{post.title}</h1>
      {post?.mainImage ? (
        <Image
          className='float-left m-0 w-1/3 mr-4 rounded-lg'
          src={urlFor(post.mainImage).url()}
          width={300}
          height={300}
          alt={post?.mainImage?.alt}
          priority
        />
      ) : null}
      {post?.body ? <PortableText value={post.body} /> : null}
    </main>
  );
}
