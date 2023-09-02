import { DefaultDocumentNodeResolver } from 'sanity/desk';
import Iframe from 'sanity-plugin-iframe-pane';

function getPreviewUrl() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nextjs-app-steel-one.vercel.app';
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
            url: `${getPreviewUrl()}/api/preview`,
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
