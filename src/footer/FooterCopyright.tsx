const FooterCopyright = () => (
  <div className="footer-copyright">
    {`© Daturians NFT ${new Date().getFullYear()} | Powered by Polygon`}
    <style jsx>
      {`
        .footer-copyright :global(a) {
          @apply text-primary-500;
        }

        .footer-copyright :global(a:hover) {
          @apply underline;
        }
      `}
    </style>
  </div>
);

export { FooterCopyright };
