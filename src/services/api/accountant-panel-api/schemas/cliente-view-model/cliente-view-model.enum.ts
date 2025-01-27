export enum StatusClienteModelEnum {
  INATIVO = 'Inativo',
  ATIVO = 'Ativo',
}

export enum RegimeTributarioClienteModelEnum {
  LUCRO_REAL = 'LucroReal',
  LUCRO_PRESUMIDO = 'LucroPresumido',
  SIMPLES_NACIONAL = 'SimplesNacional',
  MEI = 'Mei',
  PRODUTOR_RURAL = 'ProdutorRural',
  NENHUM = 'Nenhum',
}

export enum TipoRegimeSubstituicaoModelEnum {
  SUBSTITUTO = 'Substituto',
  SUBSTITUIDO = 'Substituído',
  AMBOS = 'Ambos',
}

export enum IndicadorAtividadeModelEnum {
  INDUSTRIAL_EQUIPARADO_INDUSTRIAL = 'IndustrialEquiparadoIndustrial',
  OUTROS = 'Outros',
}

export enum EstabelecimentoModelEnum {
  COMERCIOATACADISTA = 'ComercioAtacadista',
  COMERCIOVAREJISTA = 'ComercioVarejista',
  DISTRIBUIDOR = 'Distribuidor',
  INDUSTRIA = 'Industria',
  IMPORTADOR = 'Importador',
}

export enum RegimeEspecialModelEnum {
  SEM_REGIME_ESPECIAL = 'SemRegimeEspecial',
  MICROEMPRESA_MUNICIPAL = 'MicroempresaMunicipal',
  ESTIMATIVA = 'Estimativa',
  SOCIEDADE_DE_PROFISSIONAIS = 'SociedadeDeProfissionais',
  COOPERATIVA = 'Cooperativa',
  MICROEMPRESARIO_INDIVIDUAL = 'MicroempresarioIndividual',
  MICROEMPRESARIO_EMPRESA_DE_PEQUENO_PORTE = 'MicroempresarioEmpresaDePequenoPorte',
}
