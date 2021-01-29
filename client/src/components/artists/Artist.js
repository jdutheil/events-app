import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Artist = ({ artist }) => {
  return (
    <Card className="artist-item">
      <Card.Body>
        <Card.Title>{artist.name}</Card.Title>
        <Card.Text>
          <strong>{artist.job}</strong>
        </Card.Text>

        <Button variant="primary">Voir</Button>
      </Card.Body>
    </Card>
  )
}

export default Artist
