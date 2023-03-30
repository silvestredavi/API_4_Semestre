/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import '../App.css';
import IMask from 'imask'
import axios from 'axios'
import { registrationSchema } from '../controllers'

const  initialValues = {
  nome: '',
  tipo: '',
  email: '',
  telefone: '',
  titulo: '',
  descricao: '',
  prioridade: '',
  equipe: '',
  produto: ''
  // callRequester: '',
  // callEmail: '',
  // callPhone: '',
  // callTitle: '',
  // callType: '',
  // callDescription: '',
  // callPriority: '',
  // callState: ''
}


function Solicitacao() {

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    initialErrors: {nome: ""},
    onSubmit: async (values) => {     
      alert(JSON.stringify(values, null, 2));
      console.log(formik.values.nome);
      const response = await axios.post('http://localhost:3001/call/createCall', formik.touched);
      console.log(response.data); 
    },

  })

  function onClickLimpar() {
    formik.resetForm();
  }

  function onClickEnviar() {
    if(!formik.isValid){
      Swal.fire({
        title: 'Erro',
        text: 'Preencha todos os campos antes de enviar!',
        icon: 'error',
        confirmButtonColor: '#54C5CE',
      });
    } else {
      Swal.fire({
        title: 'Sucesso',
        text: 'Solicitação enviada com sucesso!',
        icon: 'success',
        confirmButtonColor: '#54C5CE',
      });
      formik.submitForm();
    }

  }

  useEffect(() => {

  }, [])

  return (
    <form 
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='form-solicitacao'
      onSubmit={formik.handleSubmit}
      style={{margin:"8px"}}
    >
      <div className='text-center mb-4'>
        <h1 className='text-dark fw-bolder mb-3 font-padrao-titulo'>SOLICITAÇÃO</h1>
        <div className='text-gray-500 fs-6 font-padrao-titulo mb-5' style={{letterSpacing:0}}>Preencha os campos para gerar um chamado</div>
      </div>

      {formik.status && (
        <div className='mb-5 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      <div className='row'>
        <div className='col-lg-6'>
          {/* begin::Form group Nome */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Nome</label>
            <input
              placeholder='Nome do solicitante'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('nome')}
              onChange={formik.handleChange}
              value={formik.values.nome}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.nome && formik.errors.nome,
                },
                {
                  'is-valid': formik.touched.nome && !formik.errors.nome,
                }
              )}
            />
            {formik.touched.nome && formik.errors.nome && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.nome}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        <div className='col-lg-6'>
          {/* begin::Form group Equipe */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Equipe</label>
            <input
              placeholder='Equipe do solicitante'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('equipe')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.equipe && formik.errors.equipe,
                },
                {
                  'is-valid': formik.touched.equipe && !formik.errors.equipe,
                }
              )}
            />
            {formik.touched.equipe && formik.errors.equipe && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.equipe}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}      
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
          {/* begin::Form group E-mail */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>E-mail</label>
            <input
              placeholder='E-mail do solicitante'
              type='email'
              autoComplete='off'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.email && formik.errors.email},
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        <div className='col-lg-6'>
          {/* begin::Form group Telefone */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Telefone</label>
            <input
              id='fone'
              placeholder='Telefone para contato'
              type='number'
              autoComplete='off'
              onKeyDown={(event) => {
                if (/\+|\.|-/.test(event.key))
                  event.preventDefault();
              }}
              {...formik.getFieldProps('telefone')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.telefone && formik.errors.telefone,
                },
                {
                  'is-valid': formik.touched.telefone && !formik.errors.telefone,
                }
              )}
            />
            {formik.touched.telefone && formik.errors.telefone && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.telefone}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}      
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
          {/* begin::Form group Título */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Título</label>
            <input
              placeholder='Título da solicitação'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('titulo')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.titulo && formik.errors.titulo},
                {
                  'is-valid': formik.touched.titulo && !formik.errors.titulo,
                }
              )}
            />
            {formik.touched.titulo && formik.errors.titulo && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.titulo}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        <div className='col-lg-6'>
          {/* begin::Form group Produto */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Produto</label>
            <input
              placeholder='Produto solicitado'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('produto')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.produto && formik.errors.produto,
                },
                {
                  'is-valid': formik.touched.produto && !formik.errors.produto,
                }
              )}
            />
            {formik.touched.produto && formik.errors.produto && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.produto}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}      
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          {/* begin::Form group Descrição */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Descrição</label>
            <textarea
              placeholder='Descrição da solicitação'
              rows={5}
              autoComplete='off'
              {...formik.getFieldProps('descricao')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.descricao && formik.errors.descricao},
                {
                  'is-valid': formik.touched.descricao && !formik.errors.descricao,
                }
              )}
            ></textarea>
            {formik.touched.descricao && formik.errors.descricao && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.descricao}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>        
      </div>
      
      {/* begin::Form group */}
      <div className='d-flex align-items-center justify-content-between mt-4'>
        <button type='button' className='btn btn-form' onClick={onClickLimpar}>
          Limpar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-fill" viewBox="0 0 16 16">
            <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
          </svg>
        </button>
        <button type='button' className='btn btn-form' onClick={onClickEnviar} disabled={formik.isSubmitting}>
          Enviar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
            </svg>
        </button>        
      </div>
      {/* end::Form group */}
    </form>
  )
}

export default Solicitacao

