import { Helmet } from 'react-helmet-async'
import { generateSEOMeta } from '@utils/seoUtils'

export default function SEOHead({ title, description, keywords, image, url, type, schema }) {
  const meta = generateSEOMeta({ title, description, keywords, image, url, type })

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description"         content={meta.description} />
      <meta name="keywords"            content={meta.keywords} />
      <meta name="robots"              content="index, follow" />
      <link rel="canonical"            href={meta.og.url} />

      {/* Open Graph */}
      <meta property="og:title"       content={meta.og.title} />
      <meta property="og:description" content={meta.og.description} />
      <meta property="og:type"        content={meta.og.type} />
      <meta property="og:url"         content={meta.og.url} />
      <meta property="og:image"       content={meta.og.image} />
      <meta property="og:site_name"   content="AHEZA 2050" />
      <meta property="og:locale"      content="en_RW" />

      {/* Twitter */}
      <meta name="twitter:card"        content={meta.twitter.card} />
      <meta name="twitter:title"       content={meta.twitter.title} />
      <meta name="twitter:description" content={meta.twitter.description} />
      <meta name="twitter:image"       content={meta.twitter.image} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || meta.schema)}
      </script>
    </Helmet>
  )
}