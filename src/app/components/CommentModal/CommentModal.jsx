import './CommentModalStyle.scss';
import { Dialog, DialogContent, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import CommentsServices from '../../services/dashboard/comments/comments.services';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';


const CommentModal = ({ openModal, handleCloseModal }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate, isLoading } = useMutation(
    CommentsServices.createRating,
    {
      onSuccess: () => {
        toast.success("Reunión agendada con éxito");
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || "Algo salio mal");
      },
    }
  )
  const user = useSelector((state) => state.auth.auth.user);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutate({
      rating: data.rating,
      comentary: data.commentary,
      UserId: user.userId,
      isActive: true,
      ProviderId: "286c3190-5638-4dd8-b7a3-73ec3ef9b4b9",
      serviceId: 1
    });
    reset();
    handleCloseModal();
  });

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      className='modal-root'
      PaperProps={{ sx: { borderRadius: '2rem' } }}
    >
      <DialogContent className='modal-content'>
        <header className='modal-header'>
          <h1 className='title'>Califica tu médico</h1>
          <CloseIcon className='close-btn' onClick={handleCloseModal} />
        </header>

        <form onSubmit={onSubmit} className='modal-form'>
          <p className='paragraph'>
            Por favor elija el nivel de satisfacción por la atención del
            profesional.
          </p>
          <div className='rating-star'>
            <Controller
              name='rating'
              control={control}
              defaultValue={null}
              rules={{
                required: {
                  value: true,
                  message: 'Por favor ingresa una calificación',
                },
              }}
              render={({ field }) => (
                <Rating
                  name='rating'
                  onChange={(newValue) => field.onChange(newValue)}
                  value={Number(field.value)}
                  size='large'
                  precision={0.5}
                  sx={{
                    fontSize: '4.8rem',
                  }}
                />
              )}
            />
            <div className='modal-errors'>
              {errors.rating && <span>{errors.rating.message}</span>}
            </div>
          </div>

          <textarea
            name='comment'
            id=''
            {...register('comment')}
            cols={30}
            rows={10}
            className='comment-section'
            placeholder='Escribe tu comentario'
            maxlength='300'
          />
          <footer className='modal-footer'>
            <button type='submit' className='submit-btn'>Confirmar</button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
