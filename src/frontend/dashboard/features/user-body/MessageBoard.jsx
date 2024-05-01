export default function MessageBoard() {
  return (
    <div className="col-xxl-6 col-lg-6">
      <div className="card card-height-100">
        <div className="card-header align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Message Board</h4>
        </div>
        {/* <!-- end card header --> */}

        <div className="card-body p-0">
          <div id="users-chat">
            <div
              className="chat-conversation p-3"
              id="chat-conversation"
              data-simplebar=""
              // style="height: 400px"
            >
              <ul
                className="list-unstyled chat-conversation-list chat-sm"
                id="users-conversation"
              >
                <li className="chat-list left">
                  <div className="conversation-list">
                    <div className="chat-avatar">
                      <img
                        src="/frontend/assets/images/users/avatar-2.jpg"
                        alt=""
                        className="material-shadow"
                      />
                    </div>
                    <div className="user-chat-content">
                      <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                          <p className="mb-0 ctext-content">Good morning 😊</p>
                        </div>
                        <div className="dropdown align-self-start message-box-drop">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-2-fill"></i>
                          </a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                              Reply
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="conversation-name">
                        <small className="text-muted time">09:07 am</small>
                        <span className="text-success check-message-icon">
                          <i className="ri-check-double-line align-bottom"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!-- chat-list --> */}

                <li className="chat-list right">
                  <div className="conversation-list">
                    <div className="user-chat-content">
                      <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                          <p className="mb-0 ctext-content">
                            Good morning, How are you? What about our next
                            meeting?
                          </p>
                        </div>
                        <div className="dropdown align-self-start message-box-drop">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-2-fill"></i>
                          </a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                              Reply
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="conversation-name">
                        <small className="text-muted time">09:08 am</small>
                        <span className="text-success check-message-icon">
                          <i className="ri-check-double-line align-bottom"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!-- chat-list --> */}

                <li className="chat-list left">
                  <div className="conversation-list">
                    <div className="chat-avatar">
                      <img
                        src="/frontend/assets/images/users/avatar-2.jpg"
                        alt=""
                        className="material-shadow"
                      />
                    </div>
                    <div className="user-chat-content">
                      <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                          <p className="mb-0 ctext-content">
                            Yeah everything is fine. Our next meeting tomorrow
                            at 10.00 AM
                          </p>
                        </div>
                        <div className="dropdown align-self-start message-box-drop">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-2-fill"></i>
                          </a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                              Reply
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                          <p className="mb-0 ctext-content">
                            Hey, I'm going to meet a friend of mine at the
                            department store. I have to buy some presents for my
                            parents 🎁.
                          </p>
                        </div>
                        <div className="dropdown align-self-start message-box-drop">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-2-fill"></i>
                          </a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                              Reply
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="conversation-name">
                        <small className="text-muted time">09:10 am</small>
                        <span className="text-success check-message-icon">
                          <i className="ri-check-double-line align-bottom"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!-- chat-list --> */}

                <li className="chat-list right">
                  <div className="conversation-list">
                    <div className="user-chat-content">
                      <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                          <p className="mb-0 ctext-content">Wow that's great</p>
                        </div>
                        <div className="dropdown align-self-start message-box-drop">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-2-fill"></i>
                          </a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                              Reply
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="conversation-name">
                        <small className="text-muted time">09:12 am</small>
                        <span className="text-success check-message-icon">
                          <i className="ri-check-double-line align-bottom"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!-- chat-list --> */}
              </ul>
            </div>
          </div>
          <div className="border-top border-top-dashed">
            <div className="row g-2 mx-3 mt-2 mb-3">
              <div className="col">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control border-light bg-light"
                    placeholder="Enter Message..."
                  />
                </div>
              </div>
              {/* <!-- end col --> */}
              <div className="col-auto">
                <button type="submit" className="btn btn-info">
                  <span className="d-none d-sm-inline-block me-2">Send</span>
                  <i className="mdi mdi-send float-end"></i>
                </button>
              </div>
              {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
          </div>
        </div>
        {/* <!-- end cardbody --> */}
      </div>
      {/* <!-- end card --> */}
    </div>
  );
}
