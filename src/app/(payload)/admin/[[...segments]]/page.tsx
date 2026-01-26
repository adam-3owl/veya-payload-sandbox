/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) => {
  // Add scaling script for live preview iframe
  const scalingScript = `
    (function() {
      function scalePreviewIframe() {
        const iframe = document.querySelector('.live-preview-iframe');
        const container = document.querySelector('.live-preview-window__main');
        
        if (!iframe || !container) return;
        
        const iframeStyle = iframe.getAttribute('style') || '';
        const widthMatch = iframeStyle.match(/width:\\s*(\\d+)px/);
        
        if (!widthMatch) {
          iframe.style.transform = '';
          return;
        }
        
        const iframeWidth = parseInt(widthMatch[1], 10);
        const containerWidth = container.clientWidth - 48; // account for padding
        
        if (iframeWidth > containerWidth) {
          const scale = containerWidth / iframeWidth;
          iframe.style.transform = 'scale(' + Math.min(scale, 1).toFixed(3) + ')';
          iframe.style.transformOrigin = 'top center';
          // Adjust container to account for scaled height
          const iframeHeight = iframe.clientHeight;
          iframe.style.marginBottom = '-' + (iframeHeight * (1 - scale)).toFixed(0) + 'px';
        } else {
          iframe.style.transform = '';
          iframe.style.marginBottom = '';
        }
      }
      
      // Run on load and resize
      window.addEventListener('load', scalePreviewIframe);
      window.addEventListener('resize', scalePreviewIframe);
      
      // Also watch for DOM changes (when breakpoint buttons are clicked)
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            scalePreviewIframe();
          }
        });
      });
      
      // Start observing once iframe exists
      function startObserving() {
        const iframe = document.querySelector('.live-preview-iframe');
        if (iframe) {
          observer.observe(iframe, { attributes: true, attributeFilter: ['style'] });
          scalePreviewIframe();
        } else {
          setTimeout(startObserving, 500);
        }
      }
      
      startObserving();
    })();
  `;

  return (
    <>
      <RootPage config={config} importMap={importMap} params={params} searchParams={searchParams} />
      <script dangerouslySetInnerHTML={{ __html: scalingScript }} />
    </>
  )
}

export default Page
