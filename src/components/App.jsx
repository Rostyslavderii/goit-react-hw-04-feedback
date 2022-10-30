import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { api } from './Services/api';
import { mapper } from './Services/Mapper';
import styles from './Styles.module.scss';

// import { createRef } from 'react';
// import { postsRequest } from './services/api';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    request: null,
    error: '',
    isShown: false,
    currentImage: null,
  };

  fetchImages = () => {
    const { page, request } = this.state;
    api(page, request)
      .then(response =>
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(response.data.hits)],
        }))
      )
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = data => {
    this.setState({ isLoading: true });
    if (this.state.isShown) {
      this.setState({ images: [] });
    }
    this.setState({ request: data });
    this.setState({ isShown: true });
  };

  changeCurrentImage = (url, tags) => {
    this.setState({ currentImage: { url, tags } }); //{url: url, tags: tags}
  };

  //   onModalOpen = ({ title, body }) => {
  //     this.setState({
  //       modal: {
  //         isVisible: true,
  //         data: { title, body }
  //    }
  //  })
  //   }

  // close = (e) => {
  //   if (e.target === e.currentTarget) {
  //     this.props.onClode();
  //   }

  //   handleKeyDown = (e) => {
  //     if (e.code !== 'Escape') return;
  //     this.clode();
  //   }
  // }

  onModalClose = () => {
    this.setState({ currentImage: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.request !== this.state.request && this.state.request) ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  onNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // handleResizeScreen = e => (
  //   console.log(window.innerWidth)
  // )

  // componentDidMount() {
  //   // window.addEventListener('resize', () => this.handleInput(this.state.props))

  //   // fetch("https:/")
  //   //   .then(respone => Response.json())
  //   //   .then(data => this.setState({ posts: data }));

  //   this.fetchPosts(); //!!

  // }

  // fetchPosts = async () => {
  //   try { // встановлюємо іникатор завантаження та обновлюемо помилку
  //     this.setState({ error: 'Bad Request', isLoading: true });
  //     const postsData = await postsRequest();    // const response = await fetch('htttps')
  //     // const data = await response.json();

  //     this.setState({ posts: data }); // або !!!
  //     this.setState(prevState => ({
  //       posts: [...prevState.post, ...postsData],
  //     }))
  //   } catch (e) {
  //     this.setState({ error: err.message });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.page !== this.state.page ||
  //     prevState.todos !== this.state.todos) {
  //     console.log(`${this.state.page}`);
  //     this.fetchPosts(this.state.page)
  //   }
  // }

  render() {
    const { isLoading, isShown, images, currentImage } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar handleSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {isShown && (
          <>
            <ImageGallery images={images} openModal={this.changeCurrentImage} />
            <Button text="Load More" handlerClick={this.onNextPage} />
          </>
        )}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={this.onModalClose} />
        )}
      </div>
    );
  }
}

//   render() {
//     // console.log(this.btnRef.current);
//     // const {posts, error, isLoading} = this.state; //!!!
//     return (
//       <>
//         {/* {error && <Error className="error">Some error occured: {error}</Error>}
//         {isLoading && <Loader className="loader">loading</Loader>} */}
//         <Section title="Phonebook">
//           <FormAddContact
//             addNewContact={this.addNewContact}
//             handleInput={this.handleInput}
//           />
//         </Section>
//         <Section title="Contacts">
//           <Input handleInput={this.handleInput} />
//           <ListContacts
//             contacts={this.state.contacts}
//             filter={this.state.filter}
//             userDelete={this.deleteContact}
//           />
//         </Section>
//         <button className="btn" onClick={this.onNextPage}>
//           NextPage</button>
//         {<modal.isVisible && <modal >
//           <h2>{modal.data.title}</h2>
//           <p>{modal.data.body}</p>
//         </modal>}
//         {/* <button ref={this.btnRef} className="btn" onChange={this.onNextPage}>
//           {' '}
//           NextPage
//         </button> */}
//       </>
//     );
//   }
// }

export { App };
