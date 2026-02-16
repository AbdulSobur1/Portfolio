import Script from "next/script"

export function AnalyticsScript() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      {umamiWebsiteId && umamiSrc ? (
        <Script
          defer
          src={umamiSrc}
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  )
}

