import PropTypes from 'prop-types'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chip } from '@mui/material';

const AppointmentRows = ({ data, onEdit, onDelete }) => {
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
              Confirmado  <CheckCircleOutlineIcon fontSize='22' stroke='#068F1C' />
            </div>
            <div className="data-row-tag">Maria@munia.com</div>
            <div className="data-row-tag data-row-actions">
              <button
                type='button'
                onClick={onEdit}
                className='action-button'
              >
                Editar
              </button>
              <button
                type='button'
                onClick={onDelete}
                className='action-button'
              >
                Eliminar
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
