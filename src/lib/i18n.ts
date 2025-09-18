export const translations = {
  'pt-BR': {
    common: {
      loading: 'Carregando...',
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      edit: 'Editar',
      view: 'Visualizar',
      add: 'Adicionar',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      import: 'Importar',
      close: 'Fechar',
      confirm: 'Confirmar',
      yes: 'Sim',
      no: 'Não',
      next: 'Próximo',
      previous: 'Anterior',
      back: 'Voltar',
      continue: 'Continuar',
      finish: 'Finalizar',
    },
    auth: {
      login: 'Entrar',
      logout: 'Sair',
      register: 'Cadastrar',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      forgotPassword: 'Esqueci minha senha',
      rememberMe: 'Lembrar de mim',
      invalidCredentials: 'Email ou senha inválidos',
      accountDisabled: 'Conta desativada',
      signInTitle: 'Entre em sua conta',
      signUpTitle: 'Crie sua conta',
    },
    portal: {
      title: 'Portal do Cliente',
      welcome: 'Bem-vindo',
      newAppointment: 'Novo Agendamento',
      myAppointments: 'Meus Agendamentos',
      history: 'Histórico',
      reviews: 'Avaliações',
      loyalty: 'Programa de Fidelidade',
      membership: 'Carteirinha Digital',
      profile: 'Meu Perfil',
      preferences: 'Preferências',
    },
    admin: {
      title: 'Painel Administrativo',
      dashboard: 'Dashboard',
      units: 'Unidades',
      barbers: 'Barbeiros',
      services: 'Serviços',
      clients: 'Clientes',
      appointments: 'Agendamentos',
      reports: 'Relatórios',
      settings: 'Configurações',
      users: 'Usuários',
      plans: 'Planos',
      coupons: 'Cupons',
    },
    barber: {
      title: 'Área do Barbeiro',
      mySchedule: 'Minha Agenda',
      blockSlots: 'Bloquear Horários',
      commissions: 'Comissões',
      earnings: 'Ganhos',
      appointments: 'Atendimentos',
      clients: 'Clientes',
    },
    appointments: {
      status: {
        scheduled: 'Agendado',
        confirmed: 'Confirmado',
        completed: 'Concluído',
        canceled: 'Cancelado',
        noShow: 'Não compareceu',
      },
      actions: {
        reschedule: 'Reagendar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        complete: 'Concluir',
      },
    },
    services: {
      categories: {
        hair: 'Cabelo',
        beard: 'Barba',
        combo: 'Combo',
        chemical: 'Química',
        others: 'Outros',
      },
    },
    notifications: {
      success: 'Operação realizada com sucesso',
      error: 'Ocorreu um erro',
      warning: 'Atenção',
      info: 'Informação',
    },
    time: {
      minutes: 'minutos',
      hours: 'horas',
      days: 'dias',
      weeks: 'semanas',
      months: 'meses',
      years: 'anos',
    },
    errors: {
      networkError: 'Erro de conexão',
      serverError: 'Erro interno do servidor',
      notFound: 'Não encontrado',
      unauthorized: 'Não autorizado',
      forbidden: 'Acesso negado',
      validationError: 'Erro de validação',
    },
  },
  en: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      close: 'Close',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      next: 'Next',
      previous: 'Previous',
      back: 'Back',
      continue: 'Continue',
      finish: 'Finish',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password',
      rememberMe: 'Remember Me',
      invalidCredentials: 'Invalid email or password',
      accountDisabled: 'Account disabled',
      signInTitle: 'Sign in to your account',
      signUpTitle: 'Create your account',
    },
    // ... more translations
  },
}

export type Locale = keyof typeof translations
export type TranslationKey = string

export function useTranslation(locale: Locale = 'pt-BR') {
  const t = (key: TranslationKey): string => {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return { t }
}