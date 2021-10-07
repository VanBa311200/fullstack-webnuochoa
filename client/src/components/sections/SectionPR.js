import React from 'react'

import { SectionContent, SectionHeading } from './ElNewProducts'
import ItemSection from './ItemSection'
import { DataSection } from './DataSection'

const SectionPR = () => {

  return (
    <SectionContent>
      <SectionHeading>Sản phẩm nổi bật</SectionHeading>
      {DataSection.map((s, index) => <ItemSection key={index} data={s} />)}

    </SectionContent>
  )
}

export default SectionPR
