import React from "react";

export default function Drawer() {
  return (
    <React.Fragment>
      <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark pmd-navbar pmd-z-depth'>
        <a
          href='javascript:void(0);'
          data-target='basicSidebar'
          data-placement='left'
          data-position='slidepush'
          is-open='true'
          is-open-width='1000'
          className='btn btn-sm pmd-btn-fab pmd-btn-flat pmd-ripple-effect pmd-sidebar-toggle'>
          <i className='material-icons md-light'>menu</i>
        </a>
        <a className='navbar-brand' href='#'>
          Brand
        </a>

        <div className='pmd-navbar-right-icon ml-auto'>
          <a
            href='javascript:void(0);'
            className='btn btn-sm pmd-btn-fab pmd-btn-flat pmd-ripple-effect'>
            <i className='material-icons pmd-sm md-light'>search</i>
          </a>
        </div>
      </nav>
      <section id='pmd-main'>
        <aside
          id='basicSidebar'
          className='pmd-sidebar bg-light pmd-z-depth'
          role='navigation'>
          <ul className='nav flex-column pmd-sidebar-nav'>
            <li className='nav-item pmd-user-info'>
              <a
                data-toggle='collapse'
                href='#collapseExample'
                className='nav-link btn-user media align-items-center'>
                <img
                  className='mr-3'
                  src='https://pro.propeller.in/assets/images/avatar-icon-40x40.png'
                  width='40'
                  height='40'
                  alt='avatar'
                />
                <div className='media-body'>User</div>
                <i className='material-icons md-light ml-2 pmd-sm'>more_vert</i>
              </a>
              <ul
                className='collapse'
                id='collapseExample'
                data-parent='#basicSidebar'>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    <i className='material-icons pmd-list-icon pmd-sm'>
                      delete
                    </i>
                    <span className='media-body'>View Profile</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    <i className='material-icons pmd-list-icon pmd-sm'>
                      delete
                    </i>
                    <span className='media-body'>Settings</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    <i className='material-icons pmd-list-icon pmd-sm'>
                      delete
                    </i>
                    <span className='media-body'>Logout</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className='nav-item'>
              <a className='nav-link' href='#inbox'>
                <i className='material-icons pmd-list-icon pmd-sm'>inbox</i>
                <span className='media-body'>Inbox</span>
              </a>
            </li>

            <li className='nav-item'>
              <a className='nav-link active' href='#'>
                <i className='material-icons pmd-list-icon pmd-sm'>star</i>
                <span className='media-body'>Stared</span>
              </a>
            </li>

            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <i className='material-icons pmd-list-icon pmd-sm'>send</i>
                <span className='media-body'>Sent Email</span>
              </a>
            </li>

            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <i className='material-icons pmd-list-icon pmd-sm'>drafts</i>
                <span className='media-body'>Drafts</span>
              </a>
            </li>
          </ul>
        </aside>
        <div className='pmd-sidebar-overlay'></div>

        <div className='pmd-content custom-pmd-content' id='content'>
          <h2 className='headline'>Sidebar Constructor</h2>
          <p>
            This structure shows a permanent app bar with a floating action
            button. The app bar absorbs elements from the tablet and mobile
            bottom bars.
          </p>
          <p>
            An optional bottom bar can be added for additional functionality or
            action overflow. A side nav overlays all other structural elements.
            A right nav menu can be accessed temporarily or pinned for permanent
            display.
            <br />
            <br />
          </p>
        </div>
      </section>
    </React.Fragment>
  );
}
