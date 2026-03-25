/**
 * ============================================
 * CLÍNICA ESCOLA DE ESTÉTICA - SCRIPT
 * DESIGN BONITO E MODERNO
 * ============================================
 * 
 * FUNCIONALIDADES:
 * - Menu responsivo (hamburguer)
 * - Scroll suave com animação
 * - Validação de datas (Segunda, Quarta, Sexta)
 * - Campo matrícula condicional
 * - Salvamento no localStorage
 * - Navbar com efeito de scroll
 * - Funções de debug no console
 * 
 * ============================================
 */

// ==================== AGUARDAR CARREGAMENTO DO DOM ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializa todas as funções
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initTipoClienteToggle();
    initDateRestrictions();
    initNavbarScroll();
    
    // Mensagem de boas vindas no console
    console.log('%c✨ CLÍNICA ESCOLA DE ESTÉTICA CARREGADA! ✨', 'color: #c41e3a; font-size: 16px; font-weight: bold;');
    console.log('%c📅 Atendimento: Segunda, Quarta e Sexta', 'color: #a0a0a0;');
    console.log('%c🎓 Alunos: Atendimento GRATUITO', 'color: #c41e3a;');
    console.log('%c💄 Design: Moderno + Elegante', 'color: #c41e3a;');
    console.log('%c📌 Funções disponíveis: listarAgendamentos(), limparAgendamentos()', 'color: #6b6b6b;');
});


// ==================== 1. MENU MOBILE ====================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Alterna ícone entre menu e X
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fecha menu ao clicar em qualquer link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}


// ==================== 2. SCROLL SUAVE ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const hamburgerIcon = document.querySelector('.hamburger i');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('fa-times');
                        hamburgerIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
}


// ==================== 3. NAVBAR COM EFEITO DE SCROLL ====================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(5, 7, 8, 0.98)';
            navbar.style.borderBottomColor = '#c41e3a';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(5, 7, 8, 0.95)';
            navbar.style.borderBottomColor = 'rgba(196, 30, 58, 0.2)';
        }
    });
}


// ==================== 4. CAMPO MATRÍCULA CONDICIONAL ====================
function initTipoClienteToggle() {
    const tipoCliente = document.getElementById('tipoCliente');
    const matriculaGroup = document.getElementById('matriculaGroup');
    const matriculaInput = document.getElementById('matricula');
    
    if (!tipoCliente || !matriculaGroup) return;
    
    tipoCliente.addEventListener('change', function() {
        if (this.value === 'aluno') {
            matriculaGroup.style.display = 'block';
            matriculaGroup.style.animation = 'fadeInUp 0.3s ease';
            if (matriculaInput) matriculaInput.required = true;
        } else {
            matriculaGroup.style.display = 'none';
            if (matriculaInput) {
                matriculaInput.required = false;
                matriculaInput.value = '';
            }
        }
    });
}


// ==================== 5. RESTRIÇÃO DE DATAS ====================
function initDateRestrictions() {
    const dataInput = document.getElementById('data');
    if (!dataInput) return;
    
    // Dias permitidos: 1 = Segunda, 3 = Quarta, 5 = Sexta
    const diasPermitidos = [1, 3, 5];
    const diasNomes = {
        1: 'Segunda-feira',
        3: 'Quarta-feira',
        5: 'Sexta-feira'
    };
    
    dataInput.addEventListener('change', function() {
        if (this.value) {
            const data = new Date(this.value);
            const diaSemana = data.getDay();
            
            if (!diasPermitidos.includes(diaSemana)) {
                alert(`⚠️ ATENÇÃO!\n\nO atendimento é realizado apenas em:\n• Segunda-feira\n• Quarta-feira\n• Sexta-feira\n\nVocê selecionou ${diasNomes[diaSemana] || 'um dia não permitido'}.\nPor favor, selecione uma data válida.`);
                this.value = '';
                return;
            }
            
            // Verificar se a data não é anterior a hoje
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            if (data < hoje) {
                alert('⚠️ Por favor, selecione uma data futura para o agendamento.');
                this.value = '';
                return;
            }
        }
    });
    
    // Define data mínima como hoje
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;
}


// ==================== 6. VALIDAÇÃO E ENVIO DO FORMULÁRIO ====================
function initFormValidation() {
    const form = document.getElementById('agendamentoForm');
    const resposta = document.getElementById('resposta');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // ========== COLETA DOS DADOS ==========
        const tipoCliente = document.getElementById('tipoCliente').value;
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const matricula = document.getElementById('matricula')?.value.trim();
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        const obs = document.getElementById('obs')?.value.trim() || '';
        const termos = document.getElementById('termos').checked;
        
        // ========== VALIDAÇÕES ==========
        
        // Tipo de cliente
        if (!tipoCliente) {
            mostrarMensagem('❌ Selecione o tipo de cliente (Aluno ou Público Geral)', 'error');
            document.getElementById('tipoCliente').focus();
            return;
        }
        
        // Nome
        if (!nome || nome.length < 3) {
            mostrarMensagem('❌ Informe seu nome completo (mínimo 3 caracteres)', 'error');
            document.getElementById('nome').focus();
            return;
        }
        
        // Email
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            mostrarMensagem('❌ Informe um e-mail válido (ex: nome@email.com)', 'error');
            document.getElementById('email').focus();
            return;
        }
        
        // Telefone
        if (!telefone || telefone.length < 8) {
            mostrarMensagem('❌ Informe um telefone válido para contato', 'error');
            document.getElementById('telefone').focus();
            return;
        }
        
        // Matrícula (se for aluno)
        if (tipoCliente === 'aluno' && (!matricula || matricula.length < 3)) {
            mostrarMensagem('❌ Alunos devem informar um número de matrícula válido', 'error');
            document.getElementById('matricula').focus();
            return;
        }
        
        // Serviço
        if (!servico) {
            mostrarMensagem('❌ Selecione um serviço', 'error');
            document.getElementById('servico').focus();
            return;
        }
        
        // Data
        if (!data) {
            mostrarMensagem('❌ Selecione uma data para o atendimento', 'error');
            document.getElementById('data').focus();
            return;
        }
        
        // Verificar dia da semana
        const dataObj = new Date(data);
        const diaSemana = dataObj.getDay();
        if (![1, 3, 5].includes(diaSemana)) {
            mostrarMensagem('❌ Atendimento apenas em Segunda, Quarta e Sexta-feira', 'error');
            document.getElementById('data').focus();
            return;
        }
        
        // Horário
        if (!horario) {
            mostrarMensagem('❌ Selecione um horário', 'error');
            document.getElementById('horario').focus();
            return;
        }
        
        // Termos
        if (!termos) {
            mostrarMensagem('❌ Você deve concordar com os termos para realizar o agendamento', 'error');
            document.getElementById('termos').focus();
            return;
        }
        
        // ========== VERIFICAR DISPONIBILIDADE ==========
        if (!verificarDisponibilidade(data, horario)) {
            mostrarMensagem('❌ Horário indisponível! Por favor, selecione outro horário.', 'error');
            document.getElementById('horario').focus();
            return;
        }
        
        // ========== CRIA OBJETO DO AGENDAMENTO ==========
        const agendamento = {
            id: Date.now(),
            dataAgendamento: new Date().toISOString(),
            tipoCliente: tipoCliente,
            nome: nome,
            email: email,
            telefone: telefone,
            matricula: tipoCliente === 'aluno' ? matricula : null,
            servico: servico,
            data: data,
            horario: horario,
            observacoes: obs,
            status: 'pendente'
        };
        
        // ========== SALVAR NO LOCALSTORAGE ==========
        salvarAgendamento(agendamento);
        
        // ========== MENSAGEM DE SUCESSO ==========
        const servicoSelect = document.getElementById('servico');
        const servicoNome = servicoSelect.options[servicoSelect.selectedIndex]?.text || servico;
        const valor = tipoCliente === 'aluno' ? 'GRÁTIS' : 'conforme tabela';
        const dataFormatada = formatarDataBR(data);
        
        const mensagem = `
            ✅ <strong>AGENDAMENTO SOLICITADO COM SUCESSO!</strong><br><br>
            📋 <strong>Dados do agendamento:</strong><br>
            • Serviço: ${servicoNome}<br>
            • Data: ${dataFormatada}<br>
            • Horário: ${horario}<br>
            • Cliente: ${nome}<br>
            • Tipo: ${tipoCliente === 'aluno' ? '🎓 ALUNO (GRATUITO)' : '👤 PÚBLICO GERAL'}<br>
            • Valor: ${valor}<br><br>
            📧 <strong>Próximos passos:</strong><br>
            Em até 24h entraremos em contato via e-mail ou WhatsApp para confirmar seu horário.<br><br>
            ⚠️ <strong>IMPORTANTE:</strong> Apresente seu documento de identificação e ${tipoCliente === 'aluno' ? 'comprovante de matrícula' : 'comprovante de agendamento'} no dia do atendimento.
        `;
        
        mostrarMensagem(mensagem, 'success');
        
        // ========== LIMPAR FORMULÁRIO ==========
        form.reset();
        const matriculaGroup = document.getElementById('matriculaGroup');
        if (matriculaGroup) matriculaGroup.style.display = 'none';
        
        // Rolar até a mensagem
        const respostaDiv = document.getElementById('resposta');
        if (respostaDiv) {
            respostaDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        console.log(`%c✅ Novo agendamento #${agendamento.id} - ${nome} - ${servicoNome}`, 'color: #4caf50;');
    });
}


// ==================== 7. VERIFICAR DISPONIBILIDADE ====================
function verificarDisponibilidade(data, horario) {
    try {
        const agendamentos = localStorage.getItem('estetica_agendamentos');
        if (!agendamentos) return true;
        
        const lista = JSON.parse(agendamentos);
        const ocupado = lista.some(a => a.data === data && a.horario === horario);
        
        return !ocupado;
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        return true;
    }
}


// ==================== 8. SALVAR NO LOCALSTORAGE ====================
function salvarAgendamento(agendamento) {
    try {
        let agendamentos = localStorage.getItem('estetica_agendamentos');
        agendamentos = agendamentos ? JSON.parse(agendamentos) : [];
        agendamentos.push(agendamento);
        localStorage.setItem('estetica_agendamentos', JSON.stringify(agendamentos));
        
        console.log(`💾 Agendamento salvo no localStorage. Total: ${agendamentos.length}`);
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        mostrarMensagem('❌ Erro ao salvar agendamento. Tente novamente.', 'error');
    }
}


// ==================== 9. EXIBIR MENSAGEM ====================
function mostrarMensagem(mensagem, tipo) {
    const resposta = document.getElementById('resposta');
    if (!resposta) return;
    
    resposta.className = `response-message ${tipo}`;
    resposta.innerHTML = mensagem;
    resposta.style.display = 'block';
    
    // Auto-esconder após 8 segundos
    setTimeout(() => {
        resposta.style.opacity = '0';
        setTimeout(() => {
            resposta.innerHTML = '';
            resposta.className = 'response-message';
            resposta.style.opacity = '';
            resposta.style.display = 'none';
        }, 500);
    }, 8000);
}


// ==================== 10. FORMATAR DATA ====================
function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const partes = dataISO.split('-');
    if (partes.length !== 3) return dataISO;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ==================== 11. FUNÇÕES DE DEBUG (CONSOLE) ====================
/**
 * Função: listarAgendamentos()
 * Descrição: Exibe todos os agendamentos salvos no console
 * Uso: Digitar 'listarAgendamentos()' no console do navegador (F12)
 */
window.listarAgendamentos = function() {
    const agendamentos = localStorage.getItem('estetica_agendamentos');
    if (agendamentos) {
        const lista = JSON.parse(agendamentos);
        console.log('%c📋 ========== LISTA DE AGENDAMENTOS ==========', 'color: #c41e3a; font-weight: bold;');
        console.table(lista);
        console.log(`%c📊 Total: ${lista.length} agendamentos`, 'color: #4caf50;');
        
        // Estatísticas por tipo
        const alunos = lista.filter(a => a.tipoCliente === 'aluno');
        const publico = lista.filter(a => a.tipoCliente === 'publico');
        console.log(`%c🎓 Alunos: ${alunos.length} agendamentos gratuitos`, 'color: #c41e3a;');
        console.log(`%c👤 Público: ${publico.length} agendamentos`, 'color: #a0a0a0;');
        
        return lista;
    } else {
        console.log('%c📭 Nenhum agendamento encontrado.', 'color: #ff9800;');
        return [];
    }
};

/**
 * Função: limparAgendamentos()
 * Descrição: Remove todos os agendamentos salvos
 * Uso: Digitar 'limparAgendamentos()' no console do navegador (F12)
 */
window.limparAgendamentos = function() {
    if (confirm('⚠️ ATENÇÃO! Tem certeza que deseja LIMPAR TODOS os agendamentos?\n\nEsta ação não pode ser desfeita.')) {
        localStorage.removeItem('estetica_agendamentos');
        console.log('%c🗑️ Todos os agendamentos foram removidos com sucesso!', 'color: #ff9800;');
        alert('✅ Todos os agendamentos foram removidos!');
    }
};

/**
 * Função: estatisticasAgendamentos()
 * Descrição: Exibe estatísticas detalhadas dos agendamentos
 * Uso: Digitar 'estatisticasAgendamentos()' no console
 */
window.estatisticasAgendamentos = function() {
    const agendamentos = localStorage.getItem('estetica_agendamentos');
    if (!agendamentos) {
        console.log('%c📭 Nenhum agendamento encontrado para estatísticas.', 'color: #ff9800;');
        return;
    }
    
    const lista = JSON.parse(agendamentos);
    
    console.log('%c📊 ========== ESTATÍSTICAS DOS AGENDAMENTOS ==========', 'color: #c41e3a; font-weight: bold;');
    console.log(`%c📅 Total de agendamentos: ${lista.length}`, 'color: #4caf50;');
    
    // Por tipo de cliente
    const alunos = lista.filter(a => a.tipoCliente === 'aluno').length;
    const publico = lista.filter(a => a.tipoCliente === 'publico').length;
    console.log(`%c🎓 Alunos (gratuito): ${alunos} (${Math.round(alunos/lista.length*100)}%)`, 'color: #c41e3a;');
    console.log(`%c👤 Público geral: ${publico} (${Math.round(publico/lista.length*100)}%)`, 'color: #a0a0a0;');
    
    // Por serviço
    const servicos = {};
    lista.forEach(a => {
        servicos[a.servico] = (servicos[a.servico] || 0) + 1;
    });
    console.log('%c💆 SERVIÇOS MAIS PROCURADOS:', 'color: #c41e3a;');
    Object.entries(servicos).sort((a,b) => b[1] - a[1]).forEach(([servico, qtd]) => {
        console.log(`   ${servico}: ${qtd} agendamentos (${Math.round(qtd/lista.length*100)}%)`);
    });
    
    // Por horário
    const horarios = {};
    lista.forEach(a => {
        horarios[a.horario] = (horarios[a.horario] || 0) + 1;
    });
    console.log('%c⏰ HORÁRIOS MAIS SOLICITADOS:', 'color: #c41e3a;');
    Object.entries(horarios).sort((a,b) => b[1] - a[1]).forEach(([horario, qtd]) => {
        console.log(`   ${horario}: ${qtd} agendamentos`);
    });
    
    // Por dia da semana
    const dias = {};
    lista.forEach(a => {
        const data = new Date(a.data);
        const diaNome = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][data.getDay()];
        dias[diaNome] = (dias[diaNome] || 0) + 1;
    });
    console.log('%c📆 DIAS MAIS PROCURADOS:', 'color: #c41e3a;');
    Object.entries(dias).forEach(([dia, qtd]) => {
        console.log(`   ${dia}: ${qtd} agendamentos`);
    });
};

// Mensagem de boas vindas no console com funções disponíveis
console.log('%c📌 FUNÇÕES DISPONÍVEIS NO CONSOLE:', 'color: #c41e3a; font-weight: bold;');
console.log('%c   • listarAgendamentos() - Ver todos os agendamentos', 'color: #a0a0a0;');
console.log('%c   • limparAgendamentos() - Limpar todos os agendamentos', 'color: #a0a0a0;');
console.log('%c   • estatisticasAgendamentos() - Ver estatísticas detalhadas', 'color: #a0a0a0;');