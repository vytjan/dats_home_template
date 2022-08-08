import React from 'react';

import Faq from 'react-faq-component';

const data = {
  title: 'FAQ',
  rows: [
    {
      title: 'What is an NFT?',
      content: (
        <div>
          <p>
            NFT stands for “non-fungible token“. NFTs are virtual crypto tokens
            used “to represent ownership of unique items. They let us tokenize
            things like art, collectibles, even real estate.
          </p>
          <p>
            They can only have one official owner at a time and they&apos;re
            secured by a blockchain - no one can modify the record of ownership
            or copy/paste a new NFT into existence.”
          </p>
          <p>
            Yes, it was Vitalik&Co who came up with this idea and implemented
            it! Check out for more on the NFT
            <a href="https://ethereum.org/en/nft/#what-are-nfts">
              <u>{' whitepaper'}</u>
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      title: 'What the fricky-dicky Daturians NFT are?',
      content: (
        <div>
          <p>
            {
              'Daturians are an NFT collection of hand-drawn and esthetically generated unique space creatures living on the Polygon blockchain. You can start going deeper into the Daturian rabbit hole on '
            }
            <a href="https://medium.com/@daturians_nft">{'Medium'}</a>.
          </p>
          <p>
            Transparent team, friendly and organically grown community -
            that&apos;s what Daturians are. This collection is our kick-starter
            and WE ARE HERE TO STAY!
          </p>
        </div>
      ),
    },
    {
      title: 'Wen & were mint?',
      content: (
        <div>
          <p>
            Where: only on this
            <a href="https://www.daturians.com/">{'website'}</a>
          </p>
        </div>
      ),
    },
    {
      title: 'How many Daturians are there?',
      content: (
        <div>
          <p>8020 plant/fungi/tech loving creatures.</p>
        </div>
      ),
    },
    {
      title: 'Mint price & limits?',
      content: (
        <div>
          <p>
            16+ MATIC in public sale | max. 20 NFTs per wallet. There will be 4
            batches with incrementing price.
          </p>
        </div>
      ),
    },
    {
      title: 'What will I own?',
      content: (
        <div>
          <p>
            Every aspect of your Daturian! Owning a Daturian NFT means you will
            own an ERC-721 non-fungible token with all of its metadata
            (obviously, including the Daturian as a profile picture (PFP)) as an
            entry to a super friendly and plant/fungi/tech loving Daturians
            community with future collections, events and many other benefits
            for Daturians NFT holders. Our community lives on Daturians discord
            server.
          </p>
          <p>
            Ownership includes full copyright and free use of the 1270 Datura
            fellas.
          </p>
        </div>
      ),
    },
    {
      title: 'Mint price & limits?',
      content: (
        <div>
          <p>
            16+ MATIC in public sale | max. 20 NFTs per wallet. There will be 4
            batches with incrementing price.
          </p>
        </div>
      ),
    },
    {
      title: `Polygon - isn't that a shape?`,
      content: (
        <div>
          <p>
            You&apos;ll be able to buy Daturians through Polygon. It&apos;s a
            scaling solution for Ethereum Blockchain. “Er, what…?” If
            you&apos;re not familiar with blockchain technologies or Ethereum in
            particular - all you need to know is that you&apos;ll avoid high
            fees upon transaction. But if you&apos;re eager to learn -
            here&apos;s a good start.
          </p>
        </div>
      ),
    },
    {
      title: 'How to mint?',
      content: (
        <div>
          <p>
            You&apos;ll need a place for your Daturian to live at. You can do
            that by getting your Metamask wallet ready and sending the desired
            amount of MATIC to the wallet and minting the Daturian on this
            website or buying one on OpenSea marketplace. The one-and-only link
            to the Daturians OpenSea collection will be posted on this website
            after the whitelist pre-sale. Beware of fake/copy collections!!!
            Plenty of scammers around these days.
          </p>
          <p>
            If you are still having doubts, feel free to join our discord.
            Wallet setup guides and all other instructions are provided there.
          </p>
        </div>
      ),
    },
    {
      title: 'How to take care of this Daturian creature?',
      content: (
        <div>
          <p>
            Keep your wallet and your data safe! We encourage you to use a
            separate Metamask wallet for each purchase of an NFT and then
            transfer it to your &apos;main&apos; wallet where you keep your
            beloved NFTs. No one wants to get scammed, right?
          </p>
          <p>
            If you are still having doubts, feel free to join our discord.
            Wallet setup guides and all other instructions are provided there.
          </p>
          <p>
            Safe wallet = happy Daturian. And most importantly - read fantasy
            novels to your Daturian, make sure to check if their leaves are not
            falling down and catch up with your fellow Daturian holders.
          </p>
        </div>
      ),
    },
  ],
};

const styles = {
  bgColor: 'white',
  titleTextColor: 'blue',
  rowTitleColor: 'blue',
  rowContentColor: 'grey',
  arrowColor: 'blue',
};

const config = {
  animate: true,
  arrowIcon: 'v',
  tabFocus: true,
};

const FaqCont = () => {
  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-blue rounded-md col-span-3">
      <Faq data={data} config={config} styles={styles} />
    </div>
  );
};

export { FaqCont };
