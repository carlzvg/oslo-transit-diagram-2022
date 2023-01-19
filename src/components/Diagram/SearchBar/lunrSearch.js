import lunr from 'lunr';
import information from '@/information.json';

const documents = information.station.map((stn) => {
  stn.keyword = `${stn.norwegian} ${stn?.english}`;
  return stn;
});

const searchIndex = lunr(function() {
  this.ref('id');
  this.field('keyword');

  documents.forEach(function(doc) {
    this.add(doc)
  }, this);
});

export default searchIndex;