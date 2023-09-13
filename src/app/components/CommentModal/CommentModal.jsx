import './CommentModalStyle.scss';
import { Dialog, DialogContent, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';

const CommentModal = ({ openModal, handleCloseModal }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert('enviando datos...');
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
            <button className='submit-btn'>Confirmar</button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
