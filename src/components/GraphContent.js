import React from 'react'
import { Segment } from 'semantic-ui-react'
import ExampleChart from './ExampleChart';

const GraphContent = () => (
  <Segment.Group>
    <Segment.Group>
      <Segment>
        <ExampleChart />
      </Segment>
    </Segment.Group>
  </Segment.Group>
);

export default GraphContent;
