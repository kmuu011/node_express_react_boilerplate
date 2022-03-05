import React, {useRef, useState} from 'react';
import './Main.scss';
import Button from "components/Button/Button";

import API_sign from "api/sign";

function Index() {
    const [id, setId] = useState("");
    const [password, setPw] = useState("");
    const [keep_check, setCb] = useState(false);
    const idInputRef = useRef();
    const passwordInputRef = useRef();

    async function login (e) {
        e.preventDefault();

        let params;

        if(id === '' || id.toString().replace(/\s/g, '') === ''){
            alert('아이디를 입력해주세요.');
            idInputRef.current.focus();
            return;
        }

        if(password === '' || password.toString().replace(/\s/g, '') === ''){
            alert('비밀번호를 입력해주세요.');
            passwordInputRef.current.focus();
            return;
        }

        params = { id, password, keep_check };

        let result = await API_sign.login(params);

        if(result === undefined || result.status !== 200){
            alert(result.data.message);
            return;
        }

        localStorage.setItem('x-token', result.data['token']);

        window.location = '/my_page';
    }

  return (
      <div className="login_page">
          <div className="login_body">
              <div className="main_title">테스트</div>

              <div className="login_body_desc">
                  로그인
              </div>

              <form onSubmit={login}>
                  <div className="login_id">
                      <input ref={idInputRef} type="text" value={id} id="id" placeholder="아이디"
                             onChange={(e) => setId(e.target.value)} />
                  </div>

                  <div className="login_password">
                      <input ref={passwordInputRef} type="password" value={password} id="password" placeholder="비밀번호"
                             onChange={(e) => setPw(e.target.value)} />
                  </div>

                  <div className={"keep_login"}>
                      <input type={"checkbox"} id={"cb"} value={keep_check}
                      onChange={(e) => setCb(e.target.checked)} />
                      <label htmlFor={"cb"}>
                          <div className={"keep_login_label"}>
                              로그인 상태 유지
                          </div>
                      </label>
                  </div>

                  <div className="login_sign_in">
                      <Button.submit name={"로그인"}/>
                  </div>
              </form>

              <div className="login_sign_up">
                  <Button.location name={"회원가입"} url={"/sign_up"}/>
              </div>

          </div>
      </div>
  );

}



export default Index;
