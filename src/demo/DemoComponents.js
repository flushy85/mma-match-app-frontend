// jumbotron container for fighter details

const Details = ({ firstName, lastName }) => {
  const [data, setData] = useState(null)
  let { fighterId } = useParams()

  useEffect(() => {
    async function fetchDetails() {
      const details = await fighterService.getOne(fighterId)
    setData({
      ...details
      })
    }
    fetchDetails()

  }, [fighterId])

  if(data){
    return (
      <Container>
        <Jumbotron className="data-card">
          <h1 className="fighter-title">{data.name} "{data.nickname}"</h1>
          <img className="fighter-image" src={`http://www.sherdog.com${data.image_url}`}/>
            <div className="text-box">
              <p><b>Age:</b>{data.age}</p>
              <p><b>Height:</b>{data.height}</p>
              <p><b>Weight:</b>{data.weight}</p>
              <p><b> Birthday:</b>{data.birthday}</p>
              <p><b>Weight Class:</b>{data.weight_class}</p>
              
            </div>
            <div>
              <Button variant="dark">Stats</Button>
              <Button variant="dark">Record</Button>
              <Button variant="dark">Fights</Button>
            </div>          
        </Jumbotron>
        
        
        
        
        
        
        
      </Container>
    )
  }
  return (
    <div>
      <h2>Loading...</h2>
    </div>
  )
}


// fighters names displayed as a list
const Fighter = ({ firstName, lastName, rank, nationality, selectFighter, location }) => {
  let { url } = useRouteMatch()
  return (
    <ListGroup.Item className="fighters-list-item">  
      <Link
        to={{
          pathname: `${url}/${firstName}-${lastName}`,
          state: { background: location }
        }} 
        onClick={() => selectFighter(firstName, lastName)}
        variant="dark">
        <div className="fighters-list-text">
          <h3>{firstName} {lastName}</h3>
        </div>      
      </Link>
      <Button className="favorite-button"><i className="fa fa-star"></i></Button>
    </ListGroup.Item>
      
  )
}
   

const Fighters = ({ fighters, setFullName, setModalShow }) => {
  
  let location = useLocation();

  
  const selectFighter = (firstName, lastName) => {
    const newName = `${firstName} ${lastName}`
    setFullName(newName)
    setModalShow(true)
    console.log('clicked', newName)
  }

  return (  
    <Container fluid className="fighters-page-container">
      
      <div className="fighters-list-container">
        <ListGroup variant="light">
          {fighters.map(f => (
            <Fighter 
              key={f.id}
              firstName={f.firstName}
              lastName={f.lastName}
              rank={f.rank}
              nationality={f.nationality}
              setModalShow={setModalShow}
              selectFighter={selectFighter}
              location={location}
            />
          ))}
        </ListGroup>
      </div>
    </Container>
  )
}




//list of fights in accordion style
const fightList = () => {
    let recentFights = data.fights
    if(recentFights.length > 5){
      recentFights = data.fights.slice(0,4)   
    }
    return (
      recentFights.map(fight => 
      <div className="fight-list" key={fight.date}>      
        <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button}
              variant={fight.result === "win" ? "success" : fight.result === "loss" ? "danger" : "warning" }
              eventKey="0"
            >
              <span>{fight.name}</span>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {fight.result} by {fight.method}at{fight.time} of round number {fight.round}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        </Accordion>
      </div>)
    )
  }

//  Navbar for comparing fighters
  {active 
    ? <Navbar fixed="bottom" className="navbar-bottom" bg="light">
        <div className="fighter-container">
          <div onClick={() => removeActive(0)}className="fighter-box">
            {active.length >= 1 
              ? <div>
                 <div className="close-x">
                    x
                  </div>
                  <p>{active[0]}</p>
                 
                </div> 
              : null
            }
          </div>
          <p className="match-text">Vs</p>
          <div onClick={() => removeActive(1)} className="fighter-box">
          {active.length >= 2 
              ? <div>
                <div className="close-x">
                    x
                  </div>
                  <p>{active[1]}</p>
                  
                </div> 
              : null
            }
          </div>
        </div>
        <div className="button-box">
          <Button className="match-button" disabled={active.length === 2 ? false : true} variant="danger" >Match!</Button>
        </div>
      </Navbar>
    : null
  }




  // button to add fighter to match component

  {active 
    ? active.length < 2 
    ? <Button size="sm" variant="danger" className="modal-button" onClick={() => handleSelect(data)}><FistIcon/></Button>
    : null
    : null
  } 