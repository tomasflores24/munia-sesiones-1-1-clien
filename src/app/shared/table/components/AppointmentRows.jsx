import PropTypes from 'prop-types'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chip } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';

const AppointmentRows = ({ data, onEdit, onDelete }) => {
  const status = 1
  return (
    <div>
      <div className="shared_table-body">
        {data.map((appointment, index) => (
          <div className="row-table-container" key={index}>
            <div className="data-row-tag">
              <img src="" alt="picture" />
              <p>Name</p>
            </div>
            <div className="data-row-tag">
              Mie. 16-08-2023
              <br />
              13:30pm
            </div>
            <div className="data-row-tag">
              <Chip label="Nutricion" size='small' className='service-type' />              
            </div>
            <div className="data-row-tag">
              Confirmado {status === 1 ? <CheckCircleOutlineIcon fontSize='22' stroke='#068F1C' /> : <CancelOutlined fontSize='22' stroke='#FF0000' />}
            </div>
            <div className="data-row-tag">Maria@munia.com</div>
            <div className="data-row-tag data-row-actions">
              <button
                type='button'
                onClick={onEdit}
                className='action-button'
              >
                Reprogramar
              </button>
              <button
                type='button'
                onClick={onDelete}
                className='action-button'
              >
                Cancelar Cita
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

AppointmentRows.propTypes = {
  data: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default AppointmentRows
