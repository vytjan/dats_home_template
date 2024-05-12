import { useRouter } from 'next/router';

const headerArt = {
  imageUrl: `/assets/images/daturians_header.png`,
  imageAlt: `header art`,
};

const HeaderArt = () => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between bg-primary-100 rounded-xl footer-art">
      <img
        src={`${router.basePath}${headerArt.imageUrl}`}
        alt={headerArt.imageAlt}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export { HeaderArt };
