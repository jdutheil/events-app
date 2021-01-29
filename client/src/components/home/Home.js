import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Components
import SectionTitle from '../layout/titles/SectionTitle'

// Assets
import './Home.css'

import homeFirstBg from '../../assets/img/home-first-bg.jpg'

const Home = () => {
  return (
    <section className='Home'>
      <div className='dark-overlay'></div>

      <div className='home-first-slide'>
        <div className='home-first-bg'>
          <img
            className='home-first-bg-img'
            src={homeFirstBg}
            alt='Public regardant un concert'
          />
        </div>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <div className='home-title'>
              <h1 className='home-title-first'>Trouvez un groupe de musique</h1>

              <h2 className='home-title-second'>
                Pour votre événement ou soirée privée
              </h2>
            </div>
          </Col>
        </Row>
      </div>

      <div className='content'>
        <SectionTitle>Lorem ipsum dolor sic amet</SectionTitle>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel
          nisl ligula. Nunc vitae faucibus lectus. Proin nec ligula molestie,
          tincidunt mauris quis, ullamcorper urna. Morbi suscipit tincidunt
          nisl, nec pretium mauris tristique vel. Aenean hendrerit ornare odio
          et vulputate. Curabitur blandit, dui et sodales fermentum, tortor
          felis fringilla erat, sed efficitur est dolor vel nisi. Donec
          scelerisque, lacus ac consectetur aliquam, est risus cursus nulla, id
          sodales mauris neque quis arcu. Morbi luctus efficitur neque non
          efficitur. Integer arcu elit, blandit nec magna sit amet, auctor
          semper velit. Sed egestas nibh ut bibendum pellentesque. Sed vulputate
          tempor ligula, ut rutrum mauris tincidunt at. Praesent fringilla
          aliquet ex, vitae sollicitudin lorem dignissim mattis. Vestibulum
          tincidunt, urna et aliquet pulvinar, mi magna tristique ante, non
          tristique orci tellus ut lorem. Ut pellentesque, ligula dapibus mollis
          imperdiet, sapien enim semper lorem, in rutrum mauris metus in nulla.
        </p>

        <p>
          Aenean sit amet lectus nec leo fringilla tincidunt. Phasellus
          condimentum eros nec risus aliquam, in venenatis justo gravida. Nullam
          eu mauris mauris. Fusce at urna efficitur, tincidunt enim a, tempor
          augue. Vivamus sem tortor, volutpat ac urna elementum, vestibulum
          elementum dui. Nulla interdum metus ac vehicula placerat. Phasellus
          feugiat eros sit amet tristique porta. Fusce sollicitudin et dolor nec
          vulputate. Curabitur fermentum semper turpis, id lacinia ipsum
          ullamcorper a. Vivamus odio mauris, consequat at vestibulum et,
          faucibus sit amet nulla. Vivamus sodales neque at purus accumsan, ut
          facilisis massa sollicitudin.
        </p>
      </div>
    </section>
  )
}

export default Home
