import { useRouter } from 'next/router';

const footerArt = {
  imageUrl: `/assets/images/flora_vs_tech.png`,
  imageAlt: `Footer art`,
};

const FooterArt = () => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
      <img
        src={`${router.basePath}${footerArt.imageUrl}`}
        alt={footerArt.imageAlt}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export { FooterArt };
