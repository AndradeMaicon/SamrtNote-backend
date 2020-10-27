# SmartNote

Aplicação simples para organizar tarefas do dia ao de uma em uma hora com possibilidade de visualizar os dias e meses futuros em um calendário e adicionar titulo e nota (opcional) a tarefa.

---

## Requisitos funcionais

- O usuário deve poder visualizar um no calendário os dias em que existe alguma tarefa agendada;
- O usuário deve poder desmarcar uma tarefa agendada a qualquer momento;
- O usuário deve receber um e-mail de notificação quando o horário de uma tarefa agendada estiver próximo;
- O usuário deve receber uma notificação no próprio celular quando uma tarefa estiver próxima;
- O usuário deve poder marcar uma tarefa como concluída;
- O usuário deve poder visualizar tarefas que ficaram em aberto.

## Requisitos não funcionais

- Backend construito com NodeJS;
- Typeorm como ORM padrão;
- Postgres SQL como banco de dados.

## Regras de negocio

- O envio de e-mail com alerta de uma tarefa deve ser feiro as 21h do dia anterior;
- A notificação com alerta de tarefa deve ser enviado 30 minutos antes do horário agendado;
- Tarefas que ficaram em aberto podem ser excluídas ou remarcadas;
- As notificações de tarefas (e-mail/notificações) devem conter o titulo e horários da respectiva tarefa.