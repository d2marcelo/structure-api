import App               from '../../models/application'
import Auth              from '../../models/auth'
import Bucket            from '../../models/bucket'
import DigitalAsset      from '../../models/digital-asset'
import Document          from '../../models/document'
import DocumentRevision  from '../../models/document-revision'
import Field             from '../../models/field'
import Org               from '../../models/organization'
import Registry          from '../../models/registry'
import Taxonomy          from '../../models/taxonomy'
import Template          from '../../models/template'
import TemplateRevision  from '../../models/template-revision'
import User              from '../../models/user'

const Models = [App, Auth, Bucket, DigitalAsset, Document, DocumentRevision, Field, Org, Registry, Taxonomy, Template, TemplateRevision, User]

export default Models
