import React, { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title, Accordion } from '@/components/ui';

import styles from './Faq.module.scss';

const Faq: FC = () => {
  const items = [
    {
      title: 'How will I generate income from the NFT space?',
      text: "- Let's use an example: \n1) You bought 10% of the area of a finished object as an NFT. The object appeared in your personal cabinet, and in the real world we rented it out. The object brought for a year 24000$, of which you, as the owner receive 2400$, dividends are available to accrue every month. You take them immediately to your cryptocurrency wallet. (Link to detailed PDF guide). If a buyer has been found for the object, all users vote “To sell or not to sell”. Each individual NFT - gives the right to one vote, let's say you have 10 of them, so your decision will be weightier. If the object is eventually sold, all users get the value of their NFTs + income from the sale of the object, as well as all the money that was earned while the object was rented out. 2) If you buy a property in the excavation stage, you are buying a property that is not yet ready to rent. The cost of a single NFT is multiples less, and the sale of the entire area of the object goes in stages. For example, 100% of the area can be sold as follows: 40%, 20%, 20%, 10%, 10%. Each new stage of the sale of such an object is more expensive than the previous one, and buyers at earlier stages receive part of the dividends from the sale of part of the area at the new stage. Thus, waiting for the construction of the object brings additional income. When the property is ready for rental, all NFT buyers at the excavation stage receive the NFTs of the completed property and start taking monthly rental income, but their initial outlay on these NFTs is multiples less than buying an NFT-ready property outright. Thus the benefit justifies the expectation. An object at the excavation stage and at any stage of its development can also be sold to a real buyer and will also be done through a vote of NFT holders.",
    },
    {
      title: 'Can I sell my NFT back to Karrat or another user?',
      text: '- In the event that the co-owners of an individual facility vote to sell it, everyone will receive their rental income earned over the life of the facility + the cost of NFT back + the profit from the sale of the facility.',
    },
    {
      title: 'How does a vote for the sale of a property take place if there is a buyer for it?',
      text: '- All owners of a particular area have the right to vote, in case a favorable buyer of this particular object appeared in the real world. Based on the voting results, a decision is made whether to sell or not to sell the object. In case of sale, all users share the profit depending on the amount of NFT space purchased. The object can be sold even if it is at the excavation stage.',
    },
    {
      title: 'If I bought an NFT space in the excavation stage, do I have to wait a long time?',
      text: '- Your wait may be from 1 to 2 years, while you buy NFT space several times cheaper than it will be worth when the project is ready. So the dividends from the subsequent renting out will be worth the time spent. Also, all buyers of NFT-space at the stage of excavation receive motivational bonuses. The sale at the stage of excavation goes by stages, the area is sold out partially, so, buyers at earlier stages get a part of the money from the cost of sold meters in subsequent stages, thus having a constant motivational income, which is higher the earlier the stage at which you bought your square feet.',
    },
    {
      title: "I'm still questioning how it works, what to do?",
      text: '- In this case, please write to our official community chat ____, or directly to the manager, who will help you to understand any questions about our project ____.',
    },
    {
      title: 'What if at some point in the sale of the property the right amount of money is not raised?',
      text: 'In case the property was sold in stages, but at any stage the required amount was not collected, the funds contributed by the users for this stage are refunded back.',
    },
  ];

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title}>FAQ</Title>
          <Accordion items={items} />
        </div>
      </Wrapper>
    </section>
  );
};

export default Faq;
