import React from "react";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

const Article = () => (
  <div style={{ maxWidth: "250px" }}>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
    dolore ullam quis sunt sapiente perferendis nemo suscipit facilis mollitia
    eos rem, illo excepturi. Harum aliquid iure fugiat, soluta molestiae error.
    Laborum illo, totam illum cumque, cupiditate, autem quod dignissimos
    corrupti numquam tenetur accusantium fugiat? Harum aut distinctio optio,
    magnam asperiores possimus vitae autem, sunt qui esse dolor tempore rerum
    minima animi itaque doloribus eaque eligendi voluptatem repellendus quia
    ratione maxime. Architecto maiores adipisci consectetur nulla ipsum quidem
    deserunt blanditiis quaerat debitis doloribus tempora vel voluptas, esse
    natus repellat illo praesentium quam iusto aliquam dolorum delectus? Ab sed
    nulla totam eos, reiciendis commodi facilis voluptates nobis aut distinctio
    doloremque itaque fugit placeat sapiente nihil cupiditate omnis, voluptate,
    beatae consequatur? Quibusdam maiores veritatis temporibus aliquid sequi
    nemo! Dolores, harum? Delectus recusandae facere error consequatur hic
    debitis magni impedit nobis nemo temporibus sapiente vitae voluptate qui
    reprehenderit inventore esse, alias ea ipsum? Natus placeat excepturi
    voluptatum eum numquam? Modi, illum ipsam, voluptas, nisi natus ipsum
    deleniti consectetur distinctio repudiandae explicabo dolore inventore vero.
    Consectetur quo mollitia consequatur architecto, molestiae ipsa facilis
    repellendus amet ad, totam in veritatis magnam quisquam maiores id commodi
    accusamus cumque expedita dolore delectus porro hic. Eaque dicta, voluptates
    a labore, facere aspernatur eveniet error cupiditate iste adipisci nemo enim
    voluptas, repudiandae non esse reprehenderit odio consequuntur sed rerum
    exercitationem amet quam. Eius error enim obcaecati voluptate nostrum,
    voluptates hic perferendis dolorem, dicta magni repellendus animi ea facere
    quam, vero adipisci recusandae pariatur laborum iusto aut vitae magnam?
    Quasi illum dignissimos iusto excepturi delectus repudiandae, fuga
    exercitationem necessitatibus iure quod expedita quas. Veritatis iusto vitae
    ea fugit. Commodi nam debitis, placeat natus totam quam libero dicta
    cupiditate odit reiciendis sed tempora ad explicabo. Unde doloremque
    laboriosam nam iusto maxime harum culpa enim, modi rem obcaecati iure saepe
    quia voluptatem sapiente hic ducimus assumenda officia distinctio. Eaque,
    harum nostrum mollitia numquam dolores, facere dolor ex voluptatibus dolore
    tenetur distinctio ipsa temporibus recusandae totam debitis?
  </div>
);

class SidebarX extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <Sidebar
        sidebar={<Article />}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}>
        <button
          className='btn btn-success'
          onClick={() => this.onSetSidebarOpen(true)}>
          Call
        </button>
      </Sidebar>
    );
  }
}

export default SidebarX;
