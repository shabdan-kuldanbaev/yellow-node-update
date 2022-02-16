import React, { useCallback, useState } from 'react';
import { SectionTitle } from 'components/Common/SectionTitle';
import TabGroup from 'components/Common/TabGroup';
import {
  mapData,
  placementInfo,
  tabGroupItems,
} from './utils';
import MapWithInfo from './MapWithInfo';
import styles from './styles.module.scss';

const CompanyPlacement = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = useCallback((tabIndex) => {
    setCurrentTab(tabIndex);
  }, []);

  return (
    <section className={styles.companyPlacement}>
      <SectionTitle
        title="Our offices"
        styleTitle={styles.title}
      />
      <TabGroup
        items={tabGroupItems}
        onChange={handleTabChange}
        activeIndex={currentTab}
        className={styles.tabGroup}
      />
      <MapWithInfo
        mapData={mapData[tabGroupItems[currentTab]]}
        placementInfo={placementInfo[tabGroupItems[currentTab]]}
      />
    </section>
  );
};

export default CompanyPlacement;
