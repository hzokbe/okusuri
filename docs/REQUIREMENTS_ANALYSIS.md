# Análise de Requisitos

## Requisitos funcionais

| ID   | Requisito                | Descrição                                                                                              |
|------|--------------------------|--------------------------------------------------------------------------------------------------------|
| RF01 | Cadastro de medicamento  | O usuário deve poder cadastrar um medicamento com nome, dose e observações.                            |
| RF02 | Definição de horário     | O usuário deve poder definir um único horário diário para cada medicamento.                            |
| RF03 | Recorrência              | O usuário deve poder escolher a frequência (diária ou dias específicos da semana).                     |
| RF04 | Notificação de lembrete  | O app deve enviar notificação no horário programado de cada dose.                                      |
| RF05 | Confirmação de dose      | O usuário deve poder marcar a dose como "tomada" ou "pulada" diretamente pela notificação ou pelo app. |
| RF06 | Adiar lembrete           | O usuário deve poder adiar um lembrete (soneca) por um tempo configurável.                             |
| RF07 | Lembrete repetido        | Se a dose não for confirmada, o app deve reenviar a notificação após um intervalo definido.            |
| RF08 | Listagem de medicamentos | O usuário deve poder visualizar, editar e excluir seus medicamentos cadastrados.                       |
| RF09 | Agenda do dia            | O app deve exibir as doses do dia com o status de cada uma (pendente, tomada, pulada).                 |
| RF10 | Histórico de doses       | O usuário deve poder consultar o histórico de doses tomadas e perdidas.                                |

## Requisitos não funcionais

| ID    | Categoria           | Requisito                                                                                                   |
|-------|---------------------|-------------------------------------------------------------------------------------------------------------|
| RNF01 | Usabilidade         | O cadastro de um medicamento deve ser concluído em até 5 passos.                                            |
| RNF02 | Desempenho          | As telas principais devem carregar em até 2 segundos.                                                       |
| RNF03 | Confiabilidade      | As notificações devem ser entregues no horário programado com tolerância máxima de 1 minuto.                |
| RNF04 | Disponibilidade     | O app deve funcionar totalmente offline, com os alarmes agendados localmente no dispositivo.                |
| RNF05 | Armazenamento       | Todos os dados devem ser armazenados localmente no dispositivo, sem necessidade de conta ou servidor.       |
| RNF06 | Portabilidade       | O app deve se adaptar a diferentes tamanhos de tela de smartphones.                                         |
| RNF07 | Manutenibilidade    | O código deve seguir uma arquitetura em camadas e ter cobertura mínima de testes nas regras de agendamento. |
| RNF08 | Consumo de recursos | O app deve ter baixo consumo de bateria ao manter os alarmes em segundo plano.                              |
