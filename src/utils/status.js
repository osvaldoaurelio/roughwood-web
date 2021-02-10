const obj = {
  'pending': {
    text: 'Pendente',
    color: '#FF6F00',
    bgColor: '#FFD740',
  },
  'progress': {
    text: 'em Progresso',
    color: '#01579B',
    bgColor: '#40C4FF',
  },
  'done': {
    text: 'Concluída',
    color: '#1B5E20',
    bgColor: '#69F0AE',
  },
  'late': {
    text: 'Atrasada',
    color: '#B71C1C',
    bgColor: '#FF5252',
  },
  'invoiced': {
    text: 'Faturada',
    color: '#1A237E',
    bgColor: '#536DFE',
  },
};

const status = key => obj[key];

export default status;
