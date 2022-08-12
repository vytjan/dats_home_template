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
            NFT stands for “non-fungible token“. NFTs are <b>virtual crypto tokens</b>
            used “to represent ownership of unique items". They let us tokenize
            things like art, collectibles, even real estate.
          </p>
          <br/>
          <p>
            They can only have <b>one official owner</b> at a time and they&apos;re
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
          </p><br/>
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
          <br/>
          <p>
            Transparent team, friendly and organically grown community -
            that&apos;s what Daturians are. This collection is our kick-starter
            and <b>WE ARE HERE TO STAY!</b>
          </p><br/>
        </div>
      ),
    },
    {
      title: 'Wen & were mint?',
      content: (
        <div>
          <p>
            <b>Only</b> on this
            <a href="https://www.daturians.com/">{' website.'}</a>
          </p><br/>
        </div>
      ),
    },
    {
      title: 'How many Daturians are there?',
      content: (
        <div>
          <p><b>8020</b> plant/fungi/tech loving creatures.</p><br/>
        </div>
      ),
    },
    {
      title: 'Mint price & limits?',
      content: (
        <div>
          <p>
            <b>16+ MATIC</b> in public sale | max. <b>20 NFTs per wallet</b>. There will be 4
            batches with incrementing price.
          </p><br/>
        </div>
      ),
    },
    {
      title: 'What will I own?',
      content: (
        <div>
          <p>
            Every aspect of your Daturian! Owning a Daturian NFT means you will
            own an <b>ERC-721 non-fungible token</b> with all of its metadata
            (obviously, including the Daturian as a profile picture (PFP)) as an
            entry to a super friendly and plant/fungi/tech loving Daturians
            community with future collections, events and many other benefits
            for Daturians NFT holders. Our community lives on Daturians discord
            server.
          </p>
          <p>
            Ownership includes <b>full copyright and free use</b> of the 1270 Datura
            fellas.
          </p><br/>
        </div>
      ),
    },
    {
      title: `Polygon - isn't that a shape?`,
      content: (
        <div>
          <p>
            You&apos;ll be able to buy Daturians through Polygon. It&apos;s a
            <b>scaling solution for Ethereum Blockchain.</b> “Er, what…?” If
            you&apos;re not familiar with blockchain technologies or Ethereum in
            particular - all you need to know is that you&apos;ll avoid high
            fees upon transaction. But if you&apos;re eager to learn -
            <a href="https://polygon.technology/">{' here is'}</a> a good start.
          </p><br/>
        </div>
      ),
    },
    {
      title: 'How to mint?',
      content: (
        <div>
          <p>
            You&apos;ll need a place for your Daturian to live at. You can do
            that by getting your <b>Metamask wallet</b> ready and sending the desired
            amount of MATIC to the wallet and minting the Daturian on this
            website or buying one on OpenSea marketplace. The one-and-only link
            to the Daturians OpenSea collection will be posted on <b>this website</b>
            after the whitelist pre-sale. Beware of fake/copy collections!!!
            Plenty of scammers around these days.
          </p><br/>
          <p>
            If you are still having doubts, feel free to join our <a href="https://discord.gg/xmdURtj2WT">{'discord'}</a>.
            Wallet setup guides and all other instructions are provided there.
          </p><br/>
        </div>
      ),
    },
    {
      title: 'How to take care of this Daturian creature?',
      content: (
        <div>
          <p>
            <b>Keep your wallet and your data safe!</b> We encourage you to use a
            separate Metamask wallet for each purchase of an NFT and then
            transfer it to your &apos;main&apos; wallet where you keep your
            beloved NFTs. No one wants to get scammed, right?
          </p><br/>
          <p>
            <b>Safe wallet = happy Daturian.</b> And most importantly - read fantasy
            novels to your Daturian, make sure to check if their leaves are not
            falling down and catch up with your fellow Daturian holders.
          </p><br/>
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
    <div className="flex flex-col p-4 text-left sm:flex-row sm:items-center sm:justify-between p-12 bg-primary-100 rounded-md col-span-3">
      <Faq data={data} config={config} styles={styles} />
    </div>
  );
};

export { FaqCont };
