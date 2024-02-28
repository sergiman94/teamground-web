/** eslint-disable */

import axios from "axios";
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

const ls = require('local-storage')

// Core Components

function LoginCard1() {

  const BASE_LOCAL_URL = "https://teamground.herokuapp.com"
  const MATCHES_URL = `${BASE_LOCAL_URL}/v1/matches`
  const USERS_URL = `${BASE_LOCAL_URL}/v1/users`

  let hasRegistration = Number(window.location.toString().search("registration")) > 0 ? true : false
  const [emailFocus, setEmailFocus] = React.useState("");
  const [passwordFocus, setPasswordFocus] = React.useState("");

  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [tc, setTc] = useState(false)

  const [isTraining, setIsTraining] = useState(false)

  const checkTraining = () => { 
    let location = window.location.toString()
    location.includes("training") ? setIsTraining(true) : setIsTraining(false)
  }

  React.useEffect(() => { 
    checkTraining()
  }, [])

  const handleAuthentication = async () => {

    if (hasRegistration && password !== confirmPassword){
      console.log('passwords dont match')
      return
    }

    if (hasRegistration && !tc) {
      console.log('please accept terms and conditions')
      return
    }

    if (hasRegistration) {
      await axios.post(`${USERS_URL}`, { username: user, password: password, role:'player', email: email }).then(async (r) => {
        ls.set('user_id', r.data.data.key)
        let location = window.location.toString().replace('login', 'confirm')
        window.location.replace(`${location}&auth`)
      }).catch(error => {
        console.log(error)
      })
    } else {
      await axios.post(`${USERS_URL}/login`, { username: user, password: password }).then(async (r) => {
        ls.set('user_id', r.data.key)
        let location = window.location.toString().replace('login', isTraining ? 'confirm-training' : 'confirm')
        location.replace('&training','')
        window.location.replace(`${location}&auth`)
      }).catch(error => {
        console.log(error)
      })
    }
  }
  return (
    <>
      <Card className="bg-secondary shadow border-0">
        {/* <CardHeader className="bg-white pb-5">
          <div className="text-muted text-center mb-3">
            <small>{!hasRegistration ? 'Ingresa con ' : 'Registrate con'}</small>
          </div>
          <div className="btn-wrapper text-center">
            <Button
              className="btn-neutral btn-icon"
              color="default"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <span className="btn-inner--icon">
                <img
                  alt="..."
                  src={require("assets/img/icons/common/github.svg").default}
                ></img>
              </span>
              <span className="btn-inner--text">Github</span>
            </Button>
            <Button
              className="btn-neutral btn-icon"
              color="default"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <span className="btn-inner--icon">
                <img
                  alt="..."
                  src={require("assets/img/icons/common/google.svg").default}
                ></img>
              </span>
              <span className="btn-inner--text">Google</span>
            </Button>
          </div>
        </CardHeader> */}
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h6> {hasRegistration ? 'registrate ' : 'Ingresa con tus credenciales de TeamGround'}</h6>
          </div>
          <Form role="form">
            <FormGroup className={"mb-3 " + emailFocus}>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Usuario"
                  type="email"
                  onFocus={() => setEmailFocus("focused")}
                  onBlur={() => setEmailFocus("")}
                  onChange={(e) => setUser(e.target.value)}
                ></Input>
              </InputGroup>
            </FormGroup>
            {hasRegistration ? <FormGroup className={"mb-3 " + emailFocus}>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  onFocus={() => setEmailFocus("focused")}
                  onBlur={() => setEmailFocus("")}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </InputGroup>
            </FormGroup> : <></>}
            <FormGroup className={passwordFocus}>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Contraseña"
                  type="password"
                  onFocus={() => setPasswordFocus("focused")}
                  onBlur={() => setPasswordFocus("")}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
              </InputGroup>
            </FormGroup>
            {hasRegistration ? <FormGroup className={passwordFocus}>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Confirmar Contraseña"
                  type="password"
                  onFocus={() => setPasswordFocus("focused")}
                  onBlur={() => setPasswordFocus("")}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
              </InputGroup>
            </FormGroup> : <></>}
            {hasRegistration ? <div className="custom-control custom-control-alternative custom-checkbox">
              <input
                className="custom-control-input"
                id=" customCheckLogin2"
                type="checkbox"
                checked={tc}
                onChange={(e) => {setTc(!tc)}}
              ></input>
              <label
                className="custom-control-label"
                htmlFor=" customCheckLogin2"
              >
                <span className="text-default opacity-5">Aceptar Terminos y Condiciones</span>
              </label>
            </div> : <></>}
            <div className="text-center">
              <Button onClick={() => handleAuthentication()} className="my-4" color="primary" type="button">
                {hasRegistration ? 'Registrarse' : 'Ingresar'}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default LoginCard1;
