import { Section, Cell, Image, List, Placeholder } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

import tonSvg from './ton.svg';
import './IndexPage.less'
import {useInitData} from "@telegram-apps/sdk-react";

export const IndexPage: FC = () => {
    const initData = useInitData();

  return (
    <List>
        <Placeholder
            description="🔥 STRONG COMMUNITY HERE 🔥"
            header={`${initData?.user?.firstName || 'noname'} ${initData?.user?.lastName || 'nosurname'} aka ${initData?.user?.username}`}
        >
            <img
                alt="Telegram sticker"
                className="placeholder-img"
                src="https://xelene.me/telegram.gif"
            />
        </Placeholder>
      <Section
        header='Features'
        footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
            subtitle='Connect your TON wallet'
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header='Application Launch Data'
        footer='These pages help developer to learn more about current launch information'
      >
        <Link to='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
        <Link to='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link>
      </Section>
    </List>
  );
};
