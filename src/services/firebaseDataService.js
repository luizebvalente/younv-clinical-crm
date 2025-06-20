// Novo serviço de dados usando Firebase
import { firestoreService } from './firebase'

class FirebaseDataService {
  constructor() {
    this.useFirebase = true // Desabilitar Firebase para testes locais
    this.initializeData()
  }

  // Inicializar dados padrão
  async initializeData() {
    if (this.useFirebase) {
      await firestoreService.initializeDefaultData()
    } else {
      // Inicializar dados padrão no localStorage se não existirem
      this.initializeLocalStorageData()
    }
  }

  initializeLocalStorageData() {
    // Inicializar dados padrão se não existirem
    if (!localStorage.getItem('younv_especialidades')) {
      const especialidades = [
        { id: '1', nome: 'Dermatologia', descricao: 'Cuidados com a pele', ativo: true },
        { id: '2', nome: 'Cardiologia', descricao: 'Cuidados cardíacos', ativo: true },
        { id: '3', nome: 'Ortopedia', descricao: 'Cuidados ortopédicos', ativo: true },
        { id: '4', nome: 'Ginecologia', descricao: 'Saúde da mulher', ativo: true },
        { id: '5', nome: 'Pediatria', descricao: 'Cuidados infantis', ativo: true }
      ]
      localStorage.setItem('younv_especialidades', JSON.stringify(especialidades))
    }

    if (!localStorage.getItem('younv_medicos')) {
      const medicos = [
        { 
          id: '1', 
          nome: 'Dr. Carlos Silva', 
          crm: '12345-SP', 
          email: 'carlos@clinica.com', 
          telefone: '(11) 99999-1111', 
          especialidade_id: '1',
          ativo: true,
          data_cadastro: new Date().toISOString()
        },
        { 
          id: '2', 
          nome: 'Dra. Maria Santos', 
          crm: '67890-SP', 
          email: 'maria@clinica.com', 
          telefone: '(11) 99999-2222', 
          especialidade_id: '2',
          ativo: true,
          data_cadastro: new Date().toISOString()
        }
      ]
      localStorage.setItem('younv_medicos', JSON.stringify(medicos))
    }

    if (!localStorage.getItem('younv_procedimentos')) {
      const procedimentos = [
        { 
          id: '1', 
          nome: 'Consulta Dermatológica', 
          valor: 200, 
          duracao: 30, 
          categoria: 'Consulta',
          especialidade_id: '1',
          ativo: true
        },
        { 
          id: '2', 
          nome: 'Ecocardiograma', 
          valor: 350, 
          duracao: 45, 
          categoria: 'Exame',
          especialidade_id: '2',
          ativo: true
        }
      ]
      localStorage.setItem('younv_procedimentos', JSON.stringify(procedimentos))
    }

    if (!localStorage.getItem('younv_leads')) {
      const leads = [
        {
          id: '1',
          data_registro_contato: new Date().toISOString(),
          nome_paciente: 'Ana Silva',
          telefone: '(11) 98888-1111',
          data_nascimento: '1985-05-15',
          email: 'ana@email.com',
          canal_contato: 'Instagram',
          solicitacao_paciente: 'Consulta para tratamento de acne',
          medico_agendado_id: '1',
          especialidade_id: '1',
          procedimento_agendado_id: '1',
          agendado: true,
          status: 'Convertido'
        }
      ]
      localStorage.setItem('younv_leads', JSON.stringify(leads))
    }
  }

  // Métodos genéricos para CRUD
  async getAll(entity) {
    if (this.useFirebase) {
      try {
        return await firestoreService.getAll(this.getCollectionName(entity))
      } catch (error) {
        console.error('Erro ao buscar dados do Firebase, usando localStorage como fallback')
        return this.getFromLocalStorage(entity)
      }
    } else {
      return this.getFromLocalStorage(entity)
    }
  }

  async getById(entity, id) {
    if (this.useFirebase) {
      try {
        return await firestoreService.getById(this.getCollectionName(entity), id)
      } catch (error) {
        console.error('Erro ao buscar dados do Firebase, usando localStorage como fallback')
        const items = this.getFromLocalStorage(entity)
        return items.find(item => item.id === id)
      }
    } else {
      const items = this.getFromLocalStorage(entity)
      return items.find(item => item.id === id)
    }
  }

  async create(entity, item) {
    if (this.useFirebase) {
      try {
        // Transformar dados para o formato Firebase
        const firebaseData = this.transformToFirebase(entity, item)
        return await firestoreService.create(this.getCollectionName(entity), firebaseData)
      } catch (error) {
        console.error('Erro ao criar no Firebase, usando localStorage como fallback')
        return this.createInLocalStorage(entity, item)
      }
    } else {
      return this.createInLocalStorage(entity, item)
    }
  }

  async update(entity, id, updatedItem) {
    if (this.useFirebase) {
      try {
        // Transformar dados para o formato Firebase
        const firebaseData = this.transformToFirebase(entity, updatedItem)
        return await firestoreService.update(this.getCollectionName(entity), id, firebaseData)
      } catch (error) {
        console.error('Erro ao atualizar no Firebase, usando localStorage como fallback')
        return this.updateInLocalStorage(entity, id, updatedItem)
      }
    } else {
      return this.updateInLocalStorage(entity, id, updatedItem)
    }
  }

  async delete(entity, id) {
    if (this.useFirebase) {
      try {
        return await firestoreService.delete(this.getCollectionName(entity), id)
      } catch (error) {
        console.error('Erro ao deletar no Firebase, usando localStorage como fallback')
        return this.deleteFromLocalStorage(entity, id)
      }
    } else {
      return this.deleteFromLocalStorage(entity, id)
    }
  }

  // Métodos específicos para relatórios
  async getLeadsByPeriod(startDate, endDate) {
    if (this.useFirebase) {
      try {
        return await firestoreService.getLeadsByPeriod(startDate, endDate)
      } catch (error) {
        console.error('Erro ao buscar leads por período no Firebase')
        // Fallback para localStorage
        const leads = this.getFromLocalStorage('leads')
        return leads.filter(lead => {
          const leadDate = new Date(lead.data_registro_contato || lead.dataRegistroContato)
          return leadDate >= new Date(startDate) && leadDate <= new Date(endDate)
        })
      }
    } else {
      const leads = this.getFromLocalStorage('leads')
      return leads.filter(lead => {
        const leadDate = new Date(lead.data_registro_contato)
        return leadDate >= new Date(startDate) && leadDate <= new Date(endDate)
      })
    }
  }

  async getConversionRate() {
    if (this.useFirebase) {
      try {
        return await firestoreService.getConversionRate()
      } catch (error) {
        console.error('Erro ao calcular taxa de conversão no Firebase')
        return this.getConversionRateFromLocalStorage()
      }
    } else {
      return this.getConversionRateFromLocalStorage()
    }
  }

  async getLeadsByChannel() {
    if (this.useFirebase) {
      try {
        return await firestoreService.getLeadsByChannel()
      } catch (error) {
        console.error('Erro ao buscar leads por canal no Firebase')
        return this.getLeadsByChannelFromLocalStorage()
      }
    } else {
      return this.getLeadsByChannelFromLocalStorage()
    }
  }

  async getMedicoStats() {
    if (this.useFirebase) {
      try {
        return await firestoreService.getMedicoStats()
      } catch (error) {
        console.error('Erro ao buscar estatísticas de médicos no Firebase')
        return this.getMedicoStatsFromLocalStorage()
      }
    } else {
      return this.getMedicoStatsFromLocalStorage()
    }
  }

  // Utilitários para transformação de dados
  getCollectionName(entity) {
    // Mapear nomes de entidades para nomes de coleções Firebase
    const mapping = {
      'medicos': 'medicos',
      'especialidades': 'especialidades',
      'procedimentos': 'procedimentos',
      'leads': 'leads'
    }
    return mapping[entity] || entity
  }

  transformToFirebase(entity, data) {
    // Transformar dados do formato localStorage para Firebase
    const transformed = { ...data }
    
    // Remover campos que não devem ir para o Firebase
    delete transformed.id
    delete transformed.data_cadastro
    
    // Transformar nomes de campos para camelCase (padrão Firebase)
    if (entity === 'medicos') {
      if (transformed.especialidade_id) {
        transformed.especialidadeId = transformed.especialidade_id
        delete transformed.especialidade_id
      }
    }
    
    if (entity === 'procedimentos') {
      if (transformed.especialidade_id) {
        transformed.especialidadeId = transformed.especialidade_id
        delete transformed.especialidade_id
      }
    }
    
    if (entity === 'leads') {
      // Transformar todos os campos snake_case para camelCase
      const fieldMapping = {
        'data_registro_contato': 'dataRegistroContato',
        'nome_paciente': 'nomePaciente',
        'data_nascimento': 'dataNascimento',
        'canal_contato': 'canalContato',
        'solicitacao_paciente': 'solicitacaoPaciente',
        'medico_agendado_id': 'medicoAgendadoId',
        'especialidade_id': 'especialidadeId',
        'procedimento_agendado_id': 'procedimentoAgendadoId',
        'motivo_nao_agendamento': 'motivoNaoAgendamento',
        'outros_profissionais_agendados': 'outrosProfissionaisAgendados',
        'quais_profissionais': 'quaisProfissionais',
        'pagou_reserva': 'pagouReserva',
        'tipo_visita': 'tipoVisita',
        'valor_orcado': 'valorOrcado',
        'orcamento_fechado': 'orcamentoFechado',
        'observacao_geral': 'observacaoGeral',
        'perfil_comportamental_disc': 'perfilComportamentalDisc'
      }
      
      Object.keys(fieldMapping).forEach(oldKey => {
        if (transformed[oldKey] !== undefined) {
          transformed[fieldMapping[oldKey]] = transformed[oldKey]
          delete transformed[oldKey]
        }
      })
      
      // Transformar follow-ups em array
      const followUps = []
      for (let i = 2; i <= 5; i++) {
        const followUpKey = `follow_up_${i}`
        const dateKey = `data_follow_up_${i}`
        
        if (transformed[followUpKey] || transformed[dateKey]) {
          followUps.push({
            numero: i,
            texto: transformed[followUpKey] || '',
            data: transformed[dateKey] || ''
          })
          delete transformed[followUpKey]
          delete transformed[dateKey]
        }
      }
      
      if (followUps.length > 0) {
        transformed.followUps = followUps
      }
    }
    
    return transformed
  }

  // Métodos de fallback para localStorage
  getFromLocalStorage(entity) {
    const data = localStorage.getItem(`younv_${entity}`)
    return data ? JSON.parse(data) : []
  }

  createInLocalStorage(entity, item) {
    const items = this.getFromLocalStorage(entity)
    const newItem = {
      ...item,
      id: Date.now().toString(),
      data_cadastro: new Date().toISOString()
    }
    items.push(newItem)
    localStorage.setItem(`younv_${entity}`, JSON.stringify(items))
    return newItem
  }

  updateInLocalStorage(entity, id, updatedItem) {
    const items = this.getFromLocalStorage(entity)
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem }
      localStorage.setItem(`younv_${entity}`, JSON.stringify(items))
      return items[index]
    }
    return null
  }

  deleteFromLocalStorage(entity, id) {
    const items = this.getFromLocalStorage(entity)
    const filteredItems = items.filter(item => item.id !== id)
    localStorage.setItem(`younv_${entity}`, JSON.stringify(filteredItems))
    return true
  }

  getConversionRateFromLocalStorage() {
    const leads = this.getFromLocalStorage('leads')
    const total = leads.length
    const converted = leads.filter(lead => lead.status === 'Convertido').length
    return total > 0 ? (converted / total * 100).toFixed(1) : 0
  }

  getLeadsByChannelFromLocalStorage() {
    const leads = this.getFromLocalStorage('leads')
    const channels = {}
    leads.forEach(lead => {
      channels[lead.canal_contato] = (channels[lead.canal_contato] || 0) + 1
    })
    return channels
  }

  getMedicoStatsFromLocalStorage() {
    const leads = this.getFromLocalStorage('leads')
    const medicos = this.getFromLocalStorage('medicos')
    const stats = {}
    
    medicos.forEach(medico => {
      const medicoLeads = leads.filter(lead => lead.medico_agendado_id === medico.id)
      stats[medico.nome] = {
        total_leads: medicoLeads.length,
        agendados: medicoLeads.filter(lead => lead.agendado).length,
        convertidos: medicoLeads.filter(lead => lead.status === 'Convertido').length
      }
    })
    
    return stats
  }

  // Método para alternar entre Firebase e localStorage
  setUseFirebase(useFirebase) {
    this.useFirebase = useFirebase
  }

  // Método para migrar dados do localStorage para Firebase
  async migrateFromLocalStorage() {
    if (!this.useFirebase) {
      console.log('Firebase não está habilitado')
      return
    }

    try {
      const entities = ['especialidades', 'medicos', 'procedimentos', 'leads']
      
      for (const entity of entities) {
        const localData = this.getFromLocalStorage(entity)
        console.log(`Migrando ${localData.length} registros de ${entity}`)
        
        for (const item of localData) {
          const firebaseData = this.transformToFirebase(entity, item)
          await firestoreService.create(this.getCollectionName(entity), firebaseData)
        }
      }
      
      console.log('Migração concluída com sucesso!')
    } catch (error) {
      console.error('Erro durante a migração:', error)
      throw error
    }
  }
}

export default new FirebaseDataService()

