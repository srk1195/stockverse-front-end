import React, {useEffect} from 'react';
import { AdminNavigation } from './AdminNavigation';
import { Button, Card, Container } from "react-bootstrap"; 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import "../Css/BlogManagement.css";
import { toast } from "react-toastify";
import { addBlogs, getAllBlogs, deleteBlog } from "../../utils/axiosCall";

function BlogManagement() {
    const [open, setOpen] = React.useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
    const [currItm, setcurrItem] = React.useState();
    const [blogCont, setBlogContent] = React.useState({});
    const [allBlogs, setAllBlogs] = React.useState([]);
    useEffect(() => {
      updateList();
      }, []);

    const handleChange = (e) => {
        const blogContent = {
            content: e.target.value,
        }
        setBlogContent(blogContent);
    }

    const addBlog = () =>{
        setOpen(true);
    }

    const closeDelete = () => {
      setConfirmDeleteOpen(false)
    }
    const handleClose = () => {
        setOpen(false);
      };

    const postBlog = async () => {
        let updatedObj = blogCont;
        updatedObj['time'] = new Date()
        handleClose();
        await addBlogs(updatedObj).then((res) => {
        if (res.status === 200) {
          toast.success("Successfully added a blog to the record");
        }
      })
      .catch((err) => {
        toast.error(err);
      }, []);
      updateList();
    }

    const deleteY = async () => {
     await deleteBlog(currItm).then((res) => {
        if(res.status == 200){
          toast.success("Blog deleted successfully");
          const idx = allBlogs.findIndex(item => item._id == currItm);
          let arr = allBlogs
          arr.splice(idx, 1)
          console.log(arr)
          this.setAllBlogs(arr)
        }
      }).catch((err) => {
        toast.error(err)
      });
      setcurrItem();
      setConfirmDeleteOpen(false)
    }

    const deleteaBlog = (id) => {
      setConfirmDeleteOpen(true);
      setcurrItem(id);
    }

    const updateList = (e) => {
        getAllBlogs().then((res) => {
          var reversedArray = []
          reversedArray = res.data.blogs;
          setAllBlogs(reversedArray.reverse());
        })
        .catch((err) => {
          toast.error(err);
        }, [])
    }

    return (
        <div className='blgs'>
            <AdminNavigation/>
            <Container  style={{fontSize:18, margin: '20px'}}>
              <Button style={{float:'right'}} variant="outline-primary" onClick={addBlog}>Add</Button>
            </Container>
            <div className='blogCon'>
              {allBlogs && allBlogs.map(item => (
                <div className="blogtotalCard">
                      <Card.Body className='blogeachCard'>
                      <strong>Blog Content</strong>
                      <Card.Text>{item.BlogContent}</Card.Text>
                        <hr/>
                        <Button style={{'margin':'10px'}}  onClick={() => deleteaBlog(item._id)} variant="outline-primary" autoFocus>
                          Delete
                        </Button>
                      </Card.Body>
                    
                </div>
                ))}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <strong>Add a new blog</strong>
                </DialogTitle>
                <DialogContent>
                 <textarea className="dialog-input" type="text" onChange={handleChange}></textarea>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant="outline-primary">
                 Cancel
                </Button>
                <Button onClick={postBlog} variant="outline-primary" autoFocus>
                 Post
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmDeleteOpen} onClose={closeDelete}>
                <DialogTitle>
                    <strong>Delete Confirm?</strong>
                </DialogTitle>
                <DialogContent>
                  Are you sure you want to delete?
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDelete} variant="outline-primary">
                 Cancel
                </Button>
                <Button onClick={deleteY} variant="outline-primary" autoFocus>
                 Delete
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  }
  
  export default BlogManagement;
