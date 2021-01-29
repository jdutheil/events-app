import Artist from './Artist'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Artists = ({ artists }) => {
  return (
    <section>
      <h2>Nos artistes</h2>
      
      <Row className="artists-list">
        {artists.map((artist) => (
          <Col key={artist.id} md={3}>
            <Artist artist={artist} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default Artists
