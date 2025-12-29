# 📋 Endpoint: Histórico de Transações de Matéria Prima

## 📌 Informações Gerais

**Endpoint:** `POST /api/EstoqueMateriaPrima/ListaTransacoes`

**Descrição:** Retorna o histórico de transações (entradas e saídas) de matéria prima com filtros opcionais.

**Método:** POST

**URL Completa:** `https://villavitoriaez.up.railway.app/api/EstoqueMateriaPrima/ListaTransacoes`

---

## 📥 Request Body (Filtros)

O frontend envia um JSON com filtros opcionais. Todos os campos são **nullable** e funcionam como filtros combinados:

```json
{
  "idMateriaPrima": 32,        // número ou null
  "dataInicio": "2025-12-08",  // string (YYYY-MM-DD) ou null
  "dataFim": "2025-12-22",     // string (YYYY-MM-DD) ou null
  "tipoTransacao": 1           // número (1 ou 2) ou null
}
```

### Detalhamento dos Filtros

| Campo | Tipo | Obrigatório | Valores | Descrição |
|-------|------|-------------|---------|-----------|
| `idMateriaPrima` | number/null | ❌ | Qualquer ID válido ou null | Se null, retorna de **todas** as matérias primas |
| `dataInicio` | string/null | ❌ | "YYYY-MM-DD" ou null | Data inicial do período (inclusive) |
| `dataFim` | string/null | ❌ | "YYYY-MM-DD" ou null | Data final do período (inclusive) |
| `tipoTransacao` | number/null | ❌ | 1 (Entrada), 2 (Saída) ou null | Se null, retorna **ambos** os tipos |

### Exemplos de Request

#### Exemplo 1: Buscar Tudo (Sem Filtros)
```json
{
  "idMateriaPrima": null,
  "dataInicio": null,
  "dataFim": null,
  "tipoTransacao": null
}
```
**Resultado:** Retorna TODAS as transações do sistema.

---

#### Exemplo 2: Apenas de uma Matéria Prima
```json
{
  "idMateriaPrima": 32,
  "dataInicio": null,
  "dataFim": null,
  "tipoTransacao": null
}
```
**Resultado:** Todas as transações da matéria prima ID 32.

---

#### Exemplo 3: Por Período
```json
{
  "idMateriaPrima": null,
  "dataInicio": "2025-12-01",
  "dataFim": "2025-12-31",
  "tipoTransacao": null
}
```
**Resultado:** Todas as transações de dezembro/2025.

---

#### Exemplo 4: Apenas Entradas
```json
{
  "idMateriaPrima": null,
  "dataInicio": null,
  "dataFim": null,
  "tipoTransacao": 1
}
```
**Resultado:** Apenas transações de entrada (tipo 1).

---

#### Exemplo 5: Filtros Combinados
```json
{
  "idMateriaPrima": 32,
  "dataInicio": "2025-12-01",
  "dataFim": "2025-12-31",
  "tipoTransacao": 2
}
```
**Resultado:** Apenas **saídas** da matéria prima 32 em dezembro/2025.

---

## 📤 Response Body (Sucesso)

```json
{
  "sucesso": true,
  "mensagem": "15 transações encontradas",
  "registros": [
    {
      "idRegistro": 101,
      "idMateriaPrima": 32,
      "dscMateriaPrima": "Farinha de Trigo",
      "quantidadeKG": 50.00,
      "tipoTransacao": 1,
      "dscTipoTransacao": "Entrada",
      "dataTransacao": "2025-12-15T10:30:00",
      "observacao": "NF-12345 - Fornecedor ABC"
    },
    {
      "idRegistro": 102,
      "idMateriaPrima": 32,
      "dscMateriaPrima": "Farinha de Trigo",
      "quantidadeKG": 20.00,
      "tipoTransacao": 2,
      "dscTipoTransacao": "Saída",
      "dataTransacao": "2025-12-18T14:15:00",
      "observacao": "Pedido #789 - Cliente XYZ"
    },
    {
      "idRegistro": 103,
      "idMateriaPrima": 45,
      "dscMateriaPrima": "Açúcar",
      "quantidadeKG": 100.00,
      "tipoTransacao": 1,
      "dscTipoTransacao": "Entrada",
      "dataTransacao": "2025-12-20T09:00:00",
      "observacao": null
    }
  ]
}
```

### Estrutura da Resposta

| Campo Raiz | Tipo | Obrigatório | Descrição |
|------------|------|-------------|-----------|
| `sucesso` | boolean | ✅ | `true` se deu certo, `false` se deu erro |
| `mensagem` | string | ✅ | Mensagem descritiva (ex: "15 transações encontradas") |
| `registros` | array | ✅ | Lista de transações (pode ser vazio `[]`) |

### Estrutura de cada Registro

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `idRegistro` | number | ✅ | ID único da transação na tabela de histórico |
| `idMateriaPrima` | number | ✅ | ID da matéria prima |
| `dscMateriaPrima` | string | ✅ | Nome completo da matéria prima |
| `quantidadeKG` | number | ✅ | Quantidade movimentada em kg (sempre positivo) |
| `tipoTransacao` | number | ✅ | `1` = Entrada / `2` = Saída |
| `dscTipoTransacao` | string | ✅ | `"Entrada"` ou `"Saída"` |
| `dataTransacao` | string | ✅ | Data/hora em formato ISO 8601: `"2025-12-15T10:30:00"` |
| `observacao` | string/null | ❌ | Observação opcional (pode ser `null` ou `""`) |

---

## ❌ Response Body (Erro)

```json
{
  "sucesso": false,
  "mensagem": "Erro ao buscar histórico: Conexão com banco falhou",
  "registros": []
}
```

**HTTP Status:** `500` (Internal Server Error)

---

## 🔧 Implementação Backend Sugerida

### DTO (Data Transfer Object)

```csharp
public class FiltroHistoricoDto
{
    public int? IdMateriaPrima { get; set; }
    public string? DataInicio { get; set; }  // Formato: "YYYY-MM-DD"
    public string? DataFim { get; set; }     // Formato: "YYYY-MM-DD"
    public int? TipoTransacao { get; set; }  // 1 = Entrada, 2 = Saída
}
```

---

### Controller

```csharp
[HttpPost("ListaTransacoes")]
public async Task<IActionResult> ListaTransacoes([FromBody] FiltroHistoricoDto filtro)
{
    try
    {
        // Iniciar query na tabela de transações
        var query = _context.TransacoesEstoqueMP
            .Include(t => t.MateriaPrima)
            .AsQueryable();
        
        // FILTRO 1: Por matéria prima
        if (filtro.IdMateriaPrima.HasValue)
        {
            query = query.Where(t => t.IdMateriaPrima == filtro.IdMateriaPrima.Value);
        }
        
        // FILTRO 2: Por data início (maior ou igual)
        if (!string.IsNullOrEmpty(filtro.DataInicio))
        {
            var dataInicio = DateTime.Parse(filtro.DataInicio);
            query = query.Where(t => t.DataTransacao >= dataInicio);
        }
        
        // FILTRO 3: Por data fim (menor que o dia seguinte = até 23:59:59)
        if (!string.IsNullOrEmpty(filtro.DataFim))
        {
            var dataFim = DateTime.Parse(filtro.DataFim).AddDays(1);
            query = query.Where(t => t.DataTransacao < dataFim);
        }
        
        // FILTRO 4: Por tipo de transação
        if (filtro.TipoTransacao.HasValue)
        {
            query = query.Where(t => t.TipoTransacao == filtro.TipoTransacao.Value);
        }
        
        // Ordenar por data decrescente (mais recente primeiro)
        var registros = await query
            .OrderByDescending(t => t.DataTransacao)
            .Select(t => new
            {
                idRegistro = t.IdTransacao,
                idMateriaPrima = t.IdMateriaPrima,
                dscMateriaPrima = t.MateriaPrima.NomeMateriaPrima,
                quantidadeKG = t.QuantidadeKG,
                tipoTransacao = t.TipoTransacao,
                dscTipoTransacao = t.TipoTransacao == 1 ? "Entrada" : "Saída",
                dataTransacao = t.DataTransacao,
                observacao = t.Observacao ?? ""
            })
            .ToListAsync();
        
        return Ok(new
        {
            sucesso = true,
            mensagem = $"{registros.Count} transações encontradas",
            registros = registros
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new
        {
            sucesso = false,
            mensagem = $"Erro ao buscar histórico: {ex.Message}",
            registros = new List<object>()
        });
    }
}
```

---

## 🎯 Regras de Negócio

### 1. Ordenação
- ✅ **SEMPRE** ordenar por `DataTransacao` **DESCENDENTE**
- ✅ Transações mais recentes aparecem primeiro

### 2. Data Fim (Importante!)
```csharp
// ❌ ERRADO: Não inclui o dia inteiro
query = query.Where(t => t.DataTransacao <= dataFim);

// ✅ CORRETO: Inclui até 23:59:59
var dataFimMaisUm = DateTime.Parse(filtro.DataFim).AddDays(1);
query = query.Where(t => t.DataTransacao < dataFimMaisUm);
```

**Exemplo:**
- `dataFim = "2025-12-31"`
- Deve incluir: `"2025-12-31T23:59:59"`
- Solução: comparar `< 2025-01-01T00:00:00`

### 3. Resultado Vazio
- ✅ Se nenhum registro for encontrado, retornar:
```json
{
  "sucesso": true,
  "mensagem": "Nenhuma transação encontrada",
  "registros": []
}
```
- ❌ **NÃO** retornar erro 404 ou `sucesso: false`

### 4. Todos os Filtros Opcionais
- ✅ Se todos os filtros forem `null`, retornar **TODAS** as transações
- ✅ Filtros funcionam como **AND** (todos devem ser satisfeitos)

---

## 🗄️ Tabelas Necessárias

### TRANSACAO_ESTOQUE_MATERIA_PRIMA (ou similar)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `ID_TRANSACAO` | INT (PK, Identity) | Chave primária |
| `ID_MATERIA_PRIMA` | INT (FK) | Referência à matéria prima |
| `QUANTIDADE_KG` | DECIMAL(18,2) | Quantidade movimentada |
| `TIPO_TRANSACAO` | INT | 1 = Entrada, 2 = Saída |
| `DATA_TRANSACAO` | DATETIME | Data/hora da transação |
| `OBSERVACAO` | VARCHAR(500) | Observação opcional |
| `ID_USUARIO` | INT (FK) | Usuário que fez a transação |

### MATERIA_PRIMA

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `ID_MATERIA_PRIMA` | INT (PK) | Chave primária |
| `NOME_MATERIA_PRIMA` | VARCHAR(200) | Nome da matéria prima |
| `IND_ATIVO` | BIT | Se está ativo |

---

## 📊 SQL Exemplo (Para Teste Manual)

```sql
-- Buscar todas as transações de dezembro/2025 da matéria prima 32
SELECT 
    t.ID_TRANSACAO as idRegistro,
    t.ID_MATERIA_PRIMA as idMateriaPrima,
    m.NOME_MATERIA_PRIMA as dscMateriaPrima,
    t.QUANTIDADE_KG as quantidadeKG,
    t.TIPO_TRANSACAO as tipoTransacao,
    CASE 
        WHEN t.TIPO_TRANSACAO = 1 THEN 'Entrada'
        ELSE 'Saída'
    END as dscTipoTransacao,
    t.DATA_TRANSACAO as dataTransacao,
    ISNULL(t.OBSERVACAO, '') as observacao
FROM TRANSACAO_ESTOQUE_MATERIA_PRIMA t
INNER JOIN MATERIA_PRIMA m ON t.ID_MATERIA_PRIMA = m.ID_MATERIA_PRIMA
WHERE t.ID_MATERIA_PRIMA = 32
  AND t.DATA_TRANSACAO >= '2025-12-01'
  AND t.DATA_TRANSACAO < '2026-01-01'
ORDER BY t.DATA_TRANSACAO DESC
```

---

## 🧪 Casos de Teste

### Teste 1: Sem Filtros
**Request:**
```json
{
  "idMateriaPrima": null,
  "dataInicio": null,
  "dataFim": null,
  "tipoTransacao": null
}
```
**Expected:** Retorna todas as transações do banco.

---

### Teste 2: Filtro Simples
**Request:**
```json
{
  "idMateriaPrima": 32,
  "dataInicio": null,
  "dataFim": null,
  "tipoTransacao": null
}
```
**Expected:** Apenas transações da matéria prima 32.

---

### Teste 3: Filtro por Período
**Request:**
```json
{
  "idMateriaPrima": null,
  "dataInicio": "2025-12-01",
  "dataFim": "2025-12-31",
  "tipoTransacao": null
}
```
**Expected:** Transações entre 01/12/2025 00:00:00 e 31/12/2025 23:59:59.

---

### Teste 4: Filtro Combinado
**Request:**
```json
{
  "idMateriaPrima": 32,
  "dataInicio": "2025-12-01",
  "dataFim": "2025-12-31",
  "tipoTransacao": 2
}
```
**Expected:** Apenas **saídas** da matéria prima 32 em dezembro/2025.

---

### Teste 5: Nenhum Resultado
**Request:**
```json
{
  "idMateriaPrima": 9999,
  "dataInicio": null,
  "dataFim": null,
  "tipoTransacao": null
}
```
**Expected:**
```json
{
  "sucesso": true,
  "mensagem": "Nenhuma transação encontrada",
  "registros": []
}
```

---

## 🎨 Como o Frontend Usa os Dados

1. **Exibe Cards Coloridos:**
   - 🟢 Verde para entradas (tipo 1)
   - 🔴 Vermelho para saídas (tipo 2)

2. **Formata os Dados:**
   - Data: `"2025-12-15T10:30:00"` → `"15/12/2025 10:30"`
   - Quantidade: `50.00` → `"50,00 kg"`
   - Símbolos: `⬆️` Entrada / `⬇️` Saída

3. **Exporta CSV:**
   ```csv
   "Data","Matéria Prima","Tipo","Quantidade (kg)","Observação"
   "15/12/2025 10:30","Farinha de Trigo","Entrada","50,00","NF-12345"
   ```

---

## ✅ Checklist de Implementação

- [ ] Criar `FiltroHistoricoDto` com 4 campos nullable
- [ ] Criar endpoint `POST /ListaTransacoes`
- [ ] Implementar query com filtros opcionais (4 IFs)
- [ ] Ordenar por `DataTransacao DESC`
- [ ] Incluir join com tabela `MateriaPrima`
- [ ] Retornar formato correto: `{ sucesso, mensagem, registros }`
- [ ] Testar sem filtros (deve retornar tudo)
- [ ] Testar com cada filtro individualmente
- [ ] Testar com múltiplos filtros combinados
- [ ] Testar resultado vazio (não deve dar erro)
- [ ] Validar formato de data ISO 8601 na resposta
- [ ] Tratar exceções e retornar status 500 em caso de erro

---

## 📞 Contato Frontend

Se houver dúvidas ou necessidade de ajuste no formato da resposta, contate o time de frontend.

**Endpoint já ajustado no frontend:** ✅  
`/api/EstoqueMateriaPrima/ListaTransacoes`

---

**Data:** 29/12/2025  
**Versão:** 1.0  
**Status:** 📋 Documentação Completa - Aguardando Implementação Backend
