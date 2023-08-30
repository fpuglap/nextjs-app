import { DefaultDocumentNodeResolver } from 'sanity/desk';
import Iframe from 'sanity-plugin-iframe-pane';
import { SanityDocument } from 'sanity';

// Customise this function to show the correct URL based on the current document
// function getPreviewUrl(doc: SanityDocument) {
//   return doc?.slug?.current
//     ? `${window.location.host}/${doc.slug.current}`
//     : `${window.location.host}`;
// }

function getPreviewUrl() {
  if (process.env.NODE_ENV === 'development') {
    // Redirect to the development URL
    return `http://localhost:3000/api/preview`;
  } else {
    // Redirect to the production URL
    return `https://nextjs-app-steel-one.vercel.app/api/preview`;
  }
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: { slug: { current: any } }) =>
              doc?.slug?.current
                ? `${getPreviewUrl()}?slug=${doc.slug.current}`
                : getPreviewUrl(),
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
