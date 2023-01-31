import { MultiGraph } from 'graphology';
import { bidirectional } from 'graphology-shortest-path';
import information from '@/information.json';

const graph = new MultiGraph();

// add nodes (stations)
information.station?.forEach((station) => {
  graph.addNode(station?.id);
});

// add edges (routes from lines)
information.line.forEach((line) => {
  line?.route?.forEach((route) => {
    route?.forEach((stop, index) => {
      if (index !== route.length - 1) {
        graph.addDirectedEdge(stop, route[index + 1]);
        // if (isBidirectional)
        graph.addDirectedEdge(route[index + 1], stop);
      }
    });
  });
});

const findPath = (origin, destination) => bidirectional(graph, origin, destination);

export default graph;
export { findPath };