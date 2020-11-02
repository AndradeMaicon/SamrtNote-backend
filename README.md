# SmartNote

Aplicação simples para organizar tarefas do dia em uma agenda que notifica o usuário quando o  horário de uma tarefa marcadas esta próximo.

---

### **Start**

1. Abra a pasta backend
2. Rode npm ou yarn install
3. Configure o arquivo ormconfig.json na raiz da pasta com as credenciais do seu banco Postgres local.
4. Rode npx ou yarn migration:run para atualizar seu banco.

### **Requisitos funcionais**

- O usuário deve se cadastra na aplicação para poder acessar as funcionalidades da agenda;
- O usuário deve poder recuperar sua senha caso seja necessário;
- O usuário deve poder visualizar em um calendário os dias em que existe alguma tarefa agendada;
- O usuário deve poder desmarcar uma tarefa agendada a qualquer momento;
- O usuário deve receber um e-mail de notificação quando o horário de uma tarefa agendada estiver próximo;
- O usuário deve receber uma notificação no próprio celular quando uma tarefa estiver próxima;
- O usuário deve poder marcar uma tarefa como concluída;
- O usuário deve poder visualizar tarefas que ficaram em aberto.
- Aplicativo deve armazenar uma copia do das tarefas do usuário localmente para que seja possível velas offline;

### **Requisitos não funcionais**

- Backend construito com NodeJS;
- Typeorm como ORM padrão;
- Postgres SQL como banco de dados remoto;

### **Regras de negocio**

- O envio de e-mail com alerta de uma tarefa deve ser feiro as 21h do dia anterior;
- A notificação com alerta de tarefa deve ser enviado 30 minutos antes do horário agendado;
- Tarefas que ficaram em aberto podem ser excluídas ou remarcadas;
- As notificações de tarefas (e-mail/notificações) devem conter o titulo e horários da respectiva tarefa;
- O aplicativo deve tentar sincronizar as bases de dados local e remota ao menos duas vezes ao dia;
- O aplicativo deve notificar o usuário quando uma sincronização de dados começar;
- A sincronização não deve acontecer caso o dispositivo esteja na rede moveu;
- O link enviado por e-mail para recuperação de senha deve expirar em no máximo 2 horas apos o envio;
- O usuário deve confirmar a nova senha antes de cadastra-la.
