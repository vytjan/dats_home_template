import { Button } from '../button/Button';

const Roadmap = () => {
  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-3">
      <h1>Roadmap</h1>
      <div className="roadmap-5">
        <div className="roadmap-row">
          <Button regular={false} percentdone={true}>
            5%
          </Button>
          <Button regular={false} done={true}>
            Gallery v.1
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-right h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <Button regular={false} ongoing={true}>
            Gallery v.2
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-right h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <Button regular={false} future={true}>
            Gallery v.3
          </Button>
        </div>
        <p className="roadmap-paragraph">
          {`You'll be able to discover the stories and all sorts of details about
          each Daturian and their homeland in our gallery.`}
        </p>
      </div>
      <div className="roadmap-25">
        <div className="roadmap-row">
          <Button regular={false} percentongoing={true}>
            25%
          </Button>
          <Button regular={false} ongoing={true}>
            Seed Barrel
          </Button>
        </div>
        <p className="roadmap-paragraph">
          {`It's fun to be a tourist but by this time your Daturian needs a place
          to live. We'll start working on a new collection for Daturian holders.`}
        </p>
      </div>
      <div className="roadmap-50">
        <div className="roadmap-row">
          <Button regular={false} percentongoing={true}>
            50%
          </Button>
          <Button regular={false} ongoing={true}>
            Second drop
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-right h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <Button regular={false} rejected={true}>
            Fertilizer
          </Button>
          <Button regular={false} rejected={true}>
            Pet
          </Button>
          <Button regular={false} rejected={true}>
            House
          </Button>
        </div>
        <p className="roadmap-paragraph">
          {`It's fun to be a tourist but by this time your Daturian needs a place
          to live. We'll start working on a new collection for Daturian holders.`}
        </p>
      </div>
      <div className="roadmap-75">
        <div className="roadmap-row">
          <Button regular={false} percentdone={true}>
            75%
          </Button>
          <Button regular={false} done={true}>
            Merch
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-right h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <Button regular={false} future={true}>
            Merch v.2
          </Button>
        </div>
        <p className="roadmap-paragraph">
          {`Daturians are generous creatures - they may bring extra items that
          will materialize in an open shop and some holders will be rewarded
          with unique artifacts.`}
        </p>
      </div>
      <div className="roadmap-100">
        <div className="roadmap-row">
          <Button regular={false} percentongoing={true}>
            100%
          </Button>
          <Button regular={false} ongoing={true}>
            Utility
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-right h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <Button regular={false} future={true}>
            Text RPG
          </Button>
        </div>
        <div className="roadmap-row rejected roadmap-rejected-alignment">
          <Button regular={false} rejected={true}>
            Flora Meta
          </Button>
          <Button regular={false} rejected={true}>
            Scavange
          </Button>
          <Button regular={false} rejected={true}>
            P2E game
          </Button>
        </div>
        <div className="roadmap-row rejected roadmap-rejected-alignment">
          <Button regular={false} rejected={true}>
            Our Metaverse
          </Button>
          <Button regular={false} rejected={true}>
            Existing Metaverse
          </Button>
        </div>
        <p className="roadmap-paragraph">
          {`We are here to stay and to develop further. We'll present a few of our
          options to the community on further development of the Daturian
          metaverse.`}
        </p>
      </div>
    </div>
  );
};

export { Roadmap };
